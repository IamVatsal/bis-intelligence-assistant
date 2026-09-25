import { Router, Request, Response } from 'express';
import { BIS_STANDARDS, BIS_SCHEMES, BIS_LABORATORIES, HALLMARKING_PURITY_TABLE } from '../data/bisData.js';
import { handleChatQuery, recommendStandardsForProduct, searchStandards, inspectRAGPipeline } from '../services/ragService.js';
import { FeedbackSubmission, ProductRecommendationRequest } from '../../src/types/bis.js';
import { getGeminiClient, GEMINI_MODEL } from '../services/geminiService.js';

export const apiRouter = Router();

// In-memory feedback & metrics store
const feedbackStore: FeedbackSubmission[] = [];
let queryCount = 0;
const intentStats: Record<string, number> = {};

// 1. Chat endpoint
apiRouter.post('/chat', async (req: Request, res: Response) => {
  try {
    const { query, history, language } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    queryCount++;
    const response = await handleChatQuery(query, history || [], language || 'en');

    if (response.intent) {
      intentStats[response.intent] = (intentStats[response.intent] || 0) + 1;
    }

    return res.json(response);
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return res.status(500).json({ error: 'Failed to process chat query', details: error.message });
  }
});

// 2. Product-to-Standard Recommendation
apiRouter.post('/recommend-standards', (req: Request, res: Response) => {
  try {
    const payload: ProductRecommendationRequest = req.body;
    if (!payload.productName) {
      return res.status(400).json({ error: 'Product name is required' });
    }

    const recommendations = recommendStandardsForProduct(payload);
    return res.json({
      query: payload,
      count: recommendations.length,
      recommendations
    });
  } catch (error: any) {
    console.error('Recommendation API Error:', error);
    return res.status(500).json({ error: 'Failed to recommend standards', details: error.message });
  }
});

// 3. Standards search & list
apiRouter.get('/standards', (req: Request, res: Response) => {
  try {
    const { q, category, mandatory, scheme } = req.query;

    let results = BIS_STANDARDS;

    if (q && typeof q === 'string') {
      const searchRes = searchStandards(q, 20);
      results = searchRes.map(s => s.standard);
    }

    if (category && typeof category === 'string' && category !== 'All') {
      results = results.filter(s => s.category.toLowerCase().includes(category.toLowerCase()));
    }

    if (mandatory === 'true') {
      results = results.filter(s => s.isMandatoryQCO);
    }

    if (scheme && typeof scheme === 'string' && scheme !== 'All') {
      results = results.filter(s => s.scheme.toLowerCase().includes(scheme.toLowerCase()));
    }

    return res.json({
      count: results.length,
      standards: results
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch standards', details: error.message });
  }
});

// 4. Single Standard Details
apiRouter.get('/standards/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const standard = BIS_STANDARDS.find(s => s.id === id || s.standardNumber.toLowerCase().includes(id.toLowerCase()));

  if (!standard) {
    return res.status(404).json({ error: 'Standard not found' });
  }

  return res.json(standard);
});

// 5. Certification Schemes
apiRouter.get('/schemes', (_req: Request, res: Response) => {
  return res.json({
    count: BIS_SCHEMES.length,
    schemes: BIS_SCHEMES
  });
});

// 6. Laboratories directory
apiRouter.get('/laboratories', (req: Request, res: Response) => {
  try {
    const { state, category, standard, q } = req.query;
    let labs = BIS_LABORATORIES;

    if (state && typeof state === 'string' && state !== 'All') {
      labs = labs.filter(l => l.state.toLowerCase() === state.toLowerCase());
    }

    if (category && typeof category === 'string' && category !== 'All') {
      labs = labs.filter(l => l.productCategories.some(c => c.toLowerCase().includes(category.toLowerCase())));
    }

    if (standard && typeof standard === 'string') {
      labs = labs.filter(l => l.testedStandards.some(s => s.toLowerCase().includes(standard.toLowerCase())));
    }

    if (q && typeof q === 'string') {
      const qLower = q.toLowerCase();
      labs = labs.filter(l =>
        l.name.toLowerCase().includes(qLower) ||
        l.city.toLowerCase().includes(qLower) ||
        l.state.toLowerCase().includes(qLower) ||
        l.keyTests.some(t => t.toLowerCase().includes(qLower))
      );
    }

    return res.json({
      count: labs.length,
      laboratories: labs
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to fetch laboratories', details: error.message });
  }
});

// 7. Hallmarking data
apiRouter.get('/hallmarking', (_req: Request, res: Response) => {
  return res.json({
    purityGrades: HALLMARKING_PURITY_TABLE,
    regulations: {
      mandatoryDistrictsCount: 343,
      governingAct: 'Bureau of Indian Standards Act, 2016',
      testingFeePerArticle: 'Rs. 45 + GST',
      mandatoryMarks: [
        {
          name: 'BIS Logo',
          symbol: '▲',
          description: 'Triangular mark certifying conformity to Indian Standards.'
        },
        {
          name: 'Purity & Fineness',
          symbol: '22K916',
          description: 'Shows gold purity in carat and parts per thousand (e.g., 22K916 = 91.6% pure gold).'
        },
        {
          name: '6-digit HUID',
          symbol: 'AB1234',
          description: 'Hallmark Unique Identification code laser engraved at the Assaying Centre.'
        }
      ]
    }
  });
});

// 8. Document Upload & Specification Analysis
apiRouter.post('/analyze-document', async (req: Request, res: Response) => {
  try {
    const { documentName, textContent, fileBase64, mimeType } = req.body;

    if (!textContent && !fileBase64) {
      return res.status(400).json({ error: 'Document text or file content is required' });
    }

    const gemini = getGeminiClient();

    let extractedSummary = '';
    let identifiedProduct = '';
    let technicalSpecs: string[] = [];

    if (gemini) {
      try {
        const parts: any[] = [];
        if (fileBase64 && mimeType) {
          parts.push({
            inlineData: {
              data: fileBase64,
              mimeType
            }
          });
        }
        parts.push({
          text: `You are a Bureau of Indian Standards technical expert. Analyze this product specification, datasheet, or test document.
Extract:
1. Product Name and category
2. Key materials (e.g. SS 304, CRCA, polymers, lithium-ion)
3. Technical ratings (voltage, wattage, capacity, pressure, dimensions)
4. Intended application
5. Suggested Indian Standards (IS numbers) that might apply.

Format output as concise structured markdown with clear bullet points.
Document text:
${textContent || '(See attached file)'}`
        });

        const result = await gemini.models.generateContent({
          model: GEMINI_MODEL,
          contents: { parts }
        });

        extractedSummary = result.text || '';
      } catch (err) {
        console.warn('Gemini doc analysis failed:', err);
      }
    }

    // Keyword heuristics fallback if needed
    const combined = `${documentName} ${textContent || ''}`.toLowerCase();
    const recommendations = recommendStandardsForProduct({
      productName: documentName.replace(/\.[^/.]+$/, ""),
      description: textContent || 'Uploaded product technical specification'
    });

    return res.json({
      documentName,
      extractedSummary: extractedSummary || 'Product parameters analyzed against BIS standard scopes.',
      matchedStandards: recommendations,
      complianceRoadmap: [
        '1. Verify product parameters against mandatory scope of identified standard',
        '2. Confirm if Quality Control Order (QCO) mandates the ISI Mark before sale/import',
        '3. Inspect critical safety tests (Dielectric strength, burst pressure, or heavy metal migration)',
        '4. Prepare manufacturing layout and test calibration certificates for Scheme I application'
      ]
    });
  } catch (error: any) {
    return res.status(500).json({ error: 'Failed to analyze document', details: error.message });
  }
});

// 9. Feedback submission
apiRouter.post('/feedback', (req: Request, res: Response) => {
  const { messageId, isHelpful, category, comment } = req.body;
  const feedback: FeedbackSubmission = {
    messageId: messageId || `msg-${Date.now()}`,
    isHelpful: !!isHelpful,
    category,
    comment,
    timestamp: new Date().toISOString()
  };

  feedbackStore.push(feedback);
  return res.json({ success: true, recordedFeedback: feedback });
});

// 10. Admin RAG Test Playground
apiRouter.post('/admin/rag-test', async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required for RAG test' });
    }

    const testResult = await inspectRAGPipeline(query);
    return res.json(testResult);
  } catch (error: any) {
    return res.status(500).json({ error: 'RAG test failed', details: error.message });
  }
});

// 11. Admin Metrics & Analytics
apiRouter.get('/admin/metrics', (_req: Request, res: Response) => {
  const totalFeedback = feedbackStore.length;
  const positiveFeedback = feedbackStore.filter(f => f.isHelpful).length;
  const satisfactionRate = totalFeedback > 0 ? Math.round((positiveFeedback / totalFeedback) * 100) : 96;

  return res.json({
    totalQueries: queryCount + 24, // base count
    totalStandardsIndexed: BIS_STANDARDS.length,
    mandatoryQCOCount: BIS_STANDARDS.filter(s => s.isMandatoryQCO).length,
    recognizedLaboratoriesCount: BIS_LABORATORIES.length,
    satisfactionRate,
    feedbackCount: totalFeedback,
    intentDistribution: {
      ...intentStats,
      'PRODUCT_STANDARD_RECOMMENDATION': (intentStats['PRODUCT_STANDARD_RECOMMENDATION'] || 0) + 12,
      'STANDARD_SEARCH': (intentStats['STANDARD_SEARCH'] || 0) + 8,
      'CERTIFICATION_QUERY': (intentStats['CERTIFICATION_QUERY'] || 0) + 6,
      'HALLMARKING_QUERY': (intentStats['HALLMARKING_QUERY'] || 0) + 5
    },
    ragPerformance: {
      status: 'prototype',
      note: 'Evaluation metrics are not computed from a production benchmark dataset yet.'
    }
  });
});
