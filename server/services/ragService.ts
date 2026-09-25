import { BIS_STANDARDS, BIS_SCHEMES, BIS_LABORATORIES, HALLMARKING_PURITY_TABLE } from '../data/bisData.js';
import { BISStandard, BISLaboratory, QueryIntent, EvidenceLevel, BISCitation, ChatMessage, StandardRecommendationResult, ProductRecommendationRequest, AdminRAGTestResult, AppLanguage } from '../../src/types/bis.js';
import { getGeminiClient, GEMINI_MODEL } from './geminiService.js';

// Intent classifier rules
export function detectQueryIntent(query: string): QueryIntent {
  const q = query.toLowerCase().trim();

  // Out of scope detection
  const outOfScopePatterns = [
    'cricket', 'weather today', 'who will win', 'movie review', 'recipe for cake',
    'bitcoin price', 'stock market tip', 'song lyrics', 'football match', 'celebrity'
  ];
  if (outOfScopePatterns.some(p => q.includes(p))) {
    return 'OUT_OF_SCOPE';
  }

  // Hallmarking intent
  if (q.includes('hallmark') || q.includes('huid') || q.includes('gold purity') || q.includes('22k') || q.includes('916') || q.includes('jewellery') || q.includes('assaying')) {
    return 'HALLMARKING_QUERY';
  }

  // Laboratory / testing facility intent
  if (q.includes('lab') || q.includes('laboratory') || q.includes('where to test') || q.includes('testing center') || q.includes('test facility') || q.includes('nabl')) {
    return 'LABORATORY_SEARCH';
  }

  // Clause query
  if (q.includes('clause') || q.includes('section') || /\bcl\s*\d+/i.test(q)) {
    return 'CLAUSE_QUERY';
  }

  // Consumer query
  if (q.includes('consumer') || q.includes('complaint') || q.includes('fake isi') || q.includes('bis care') || q.includes('verify isi') || q.includes('how to check fake') || q.includes('cml number')) {
    return 'CONSUMER_QUERY';
  }

  // Scheme query
  if (q.includes('scheme') || q.includes('scheme i') || q.includes('scheme ii') || q.includes('crs') || q.includes('fmcs')) {
    return 'SCHEME_QUERY';
  }

  // Certification / Licensing process
  if (q.includes('certification process') || q.includes('how to apply') || q.includes('get bis') || q.includes('licence') || q.includes('license') || q.includes('manakonline') || q.includes('qco mandatory')) {
    return 'CERTIFICATION_QUERY';
  }

  // Testing query
  if (q.includes('testing requirement') || q.includes('test method') || q.includes('dielectric') || q.includes('burst pressure') || q.includes('hydrostatic') || q.includes('leakage test')) {
    return 'TESTING_QUERY';
  }

  // Standard search by exact number
  if (/is\s*\d+/i.test(q)) {
    return 'STANDARD_SEARCH';
  }

  // Product to standard recommendation
  if (q.includes('which standard') || q.includes('what standard') || q.includes('manufacture') || q.includes('product') || q.includes('starting a business') || q.includes('applies to') || q.includes('bottle') || q.includes('heater') || q.includes('cookware') || q.includes('battery') || q.includes('toy') || q.includes('pipe') || q.includes('bulb') || q.includes('water')) {
    return 'PRODUCT_STANDARD_RECOMMENDATION';
  }

  return 'GENERAL_BIS_QUERY';
}

// Tokenize & expand query
export function expandQueryTokens(query: string): string[] {
  const synonyms: Record<string, string[]> = {
    'geyser': ['water heater', 'storage water heater', 'is 302-2-21'],
    'heater': ['electric water heater', 'geyser', 'is 302-2-21', 'is 302-1'],
    'bottle': ['vacuum flask', 'insulated container', 'is 17526', 'is 14756'],
    'flask': ['vacuum flask', 'insulated bottle', 'is 17526'],
    'cooker': ['pressure cooker', 'is 2347'],
    'bulb': ['led lamp', 'self ballasted', 'is 16102'],
    'led': ['led lamp', 'is 16102', 'lighting'],
    'battery': ['lithium cell', 'battery pack', 'is 16046', 'power bank'],
    'toy': ['safety of toys', 'is 9873', 'children play'],
    'toys': ['safety of toys', 'is 9873'],
    'water': ['drinking water', 'potable water', 'is 10500'],
    'steel': ['tmt steel', 'rebar', 'is 1786', 'stainless steel', 'is 14756', 'is 17526'],
    'gold': ['hallmarking', 'is 14111', 'huid', 'purity', 'fineness'],
    'huid': ['hallmark unique identification', 'hallmarking', 'is 14111']
  };

  const rawWords = query.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').split(/\s+/).filter(Boolean);
  const tokenSet = new Set<string>(rawWords);

  for (const word of rawWords) {
    if (synonyms[word]) {
      for (const syn of synonyms[word]) {
        syn.split(/\s+/).forEach(t => tokenSet.add(t));
      }
    }
  }

  return Array.from(tokenSet);
}

// Hybrid search over BIS Standards
export function searchStandards(query: string, limit = 5): { standard: BISStandard; score: number }[] {
  const qLower = query.toLowerCase().trim();
  const tokens = expandQueryTokens(query);

  const scored = BIS_STANDARDS.map(std => {
    let score = 0;
    const stdNumLower = std.standardNumber.toLowerCase();
    const titleLower = std.title.toLowerCase();
    const scopeLower = std.scope.toLowerCase();

    // Exact standard number match is highest priority
    if (stdNumLower.includes(qLower) || qLower.includes(stdNumLower.split(':')[0])) {
      score += 100;
    }

    // Direct title phrase match
    if (titleLower.includes(qLower)) {
      score += 40;
    }

    // Token matching across fields
    for (const token of tokens) {
      if (token.length <= 2) continue;

      if (stdNumLower.includes(token)) score += 20;
      if (titleLower.includes(token)) score += 12;
      if (std.keywords.some(k => k.toLowerCase().includes(token))) score += 10;
      if (scopeLower.includes(token)) score += 5;
      if (std.keyClauses.some(c => c.content.toLowerCase().includes(token) || c.title.toLowerCase().includes(token))) score += 4;
    }

    return { standard: std, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Product-to-Standard Recommendation Algorithm
export function recommendStandardsForProduct(request: ProductRecommendationRequest): StandardRecommendationResult[] {
  const combinedText = `${request.productName} ${request.description} ${request.material || ''} ${request.capacityOrRating || ''} ${request.intendedUse || ''} ${request.industryCategory || ''}`.toLowerCase();
  const tokens = expandQueryTokens(combinedText);

  const results: StandardRecommendationResult[] = [];

  for (const std of BIS_STANDARDS) {
    let matchCount = 0;
    const coverageChecklist: { feature: string; matched: boolean; clauseRef: string }[] = [];

    // Material check
    const materialMatch = request.material ? std.scope.toLowerCase().includes(request.material.toLowerCase()) || std.keywords.some(k => k.toLowerCase().includes(request.material!.toLowerCase())) : false;
    if (request.material) {
      coverageChecklist.push({
        feature: `Material Specification (${request.material})`,
        matched: materialMatch,
        clauseRef: std.keyClauses[0]?.clauseNumber || 'Scope'
      });
      if (materialMatch) matchCount += 30;
    }

    // Product type check
    const productTypeMatch = std.title.toLowerCase().includes(request.productName.toLowerCase()) || std.keywords.some(k => combinedText.includes(k.toLowerCase()));
    coverageChecklist.push({
      feature: `Product Type & Construction (${request.productName})`,
      matched: productTypeMatch,
      clauseRef: 'Clause 4 / Classification'
    });
    if (productTypeMatch) matchCount += 35;

    // Capacity / Rating check
    if (request.capacityOrRating) {
      const capMatch = combinedText.includes('litre') || combinedText.includes('volt') || combinedText.includes('watt') || combinedText.includes('capacity');
      coverageChecklist.push({
        feature: `Capacity / Rating Coverage (${request.capacityOrRating})`,
        matched: capMatch,
        clauseRef: std.keyClauses.find(c => c.clauseNumber.includes('7') || c.clauseNumber.includes('5'))?.clauseNumber || 'Marking Clause'
      });
      if (capMatch) matchCount += 15;
    }

    // Safety & Performance
    coverageChecklist.push({
      feature: 'Performance & Safety Mandates',
      matched: true,
      clauseRef: std.keyClauses[1]?.clauseNumber || 'General Requirements'
    });
    matchCount += 20;

    // Token overlap score
    for (const token of tokens) {
      if (token.length > 2 && (std.scope.toLowerCase().includes(token) || std.keywords.some(k => k.includes(token)))) {
        matchCount += 3;
      }
    }

    if (matchCount >= 25) {
      const relevanceLevel = matchCount >= 65 ? 'High' : matchCount >= 40 ? 'Moderate' : 'Potential';
      const whyItApplies = `Matches product characteristics: ${request.productName}${request.material ? ` in ${request.material}` : ''}. The scope of ${std.standardNumber} explicitly addresses construction, safety, and testing for this category.`;

      results.push({
        standard: std,
        relevanceScore: Math.min(matchCount, 100),
        relevanceLevel,
        whyItApplies,
        coverageChecklist,
        isMandatory: std.isMandatoryQCO,
        qcoWarning: std.isMandatoryQCO
          ? `MANDATORY QCO IN FORCE: Governed by '${std.qcoDetails?.orderName}'. Sale or manufacture without BIS Standard Mark (ISI) is prohibited under the BIS Act, 2016.`
          : undefined
      });
    }
  }

  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

// Construct context block for RAG prompt
function buildContextBlock(standards: BISStandard[], schemes: typeof BIS_SCHEMES, labs: typeof BIS_LABORATORIES, intent: QueryIntent): string {
  let context = `<bis_sources>\n`;

  if (standards.length > 0) {
    context += `### AUTHORITATIVE INDIAN STANDARDS:\n`;
    for (const std of standards) {
      context += `[DOCUMENT ID: ${std.id}]\n`;
      context += `Standard: ${std.standardNumber} - ${std.title}\n`;
      context += `Status: ${std.status} | Category: ${std.category} | Year: ${std.year}\n`;
      context += `Mandatory QCO: ${std.isMandatoryQCO ? `YES (${std.qcoDetails?.orderName}, Gazette: ${std.qcoDetails?.gazetteRef})` : 'NO (Voluntary)'}\n`;
      context += `Applicable Scheme: ${std.scheme}\n`;
      context += `Scope: ${std.scope}\n`;
      context += `Key Clauses:\n`;
      for (const cl of std.keyClauses) {
        context += `  * ${cl.clauseNumber} (${cl.title}, Page ${cl.pageNumber}): ${cl.content}\n`;
      }
      context += `Testing Requirements: ${std.testingRequirements.join('; ')}\n`;
      context += `Required Documents: ${std.requiredDocuments.join('; ')}\n`;
      context += `Official Source: ${std.sourceUrl}\n\n`;
    }
  }

  if (intent === 'SCHEME_QUERY' || intent === 'CERTIFICATION_QUERY' || intent === 'LICENSING_QUERY' || schemes.length > 0) {
    context += `### BIS CERTIFICATION SCHEMES:\n`;
    for (const sch of schemes) {
      context += `Scheme: ${sch.name} (${sch.code})\n`;
      context += `Description: ${sch.description}\n`;
      context += `Applicable Products: ${sch.applicableProducts.join(', ')}\n`;
      context += `Eligibility: ${sch.eligibility}\n`;
      context += `Governing Regulation: ${sch.governingRegulation}\n`;
      context += `Application Portal: ${sch.applicationPortal}\n`;
      context += `Fees Overview: ${sch.feesOverview}\n`;
      context += `Process Steps:\n`;
      for (const st of sch.steps) {
        context += `  Step ${st.stepNumber}: ${st.title} - ${st.description} (Docs: ${st.documentsRequired.join(', ')}, Est. Time: ${st.timeline})\n`;
      }
      context += `Source: ${sch.sourceUrl}\n\n`;
    }
  }

  if (intent === 'LABORATORY_SEARCH' || labs.length > 0) {
    context += `### BIS RECOGNIZED LABORATORIES:\n`;
    for (const lab of labs) {
      context += `Lab: ${lab.name} (${lab.type})\n`;
      context += `Location: ${lab.city}, ${lab.state} | Address: ${lab.address}\n`;
      context += `Accreditation: NABL ${lab.nablAccreditationNo || 'Direct BIS'} (Valid until ${lab.validUntil || 'Active'})\n`;
      context += `Tested Standards: ${lab.testedStandards.join(', ')}\n`;
      context += `Key Tests: ${lab.keyTests.join('; ')}\n`;
      context += `Contact: ${lab.contactEmail}, Phone: ${lab.phone}\n\n`;
    }
  }

  if (intent === 'HALLMARKING_QUERY') {
    context += `### BIS GOLD & SILVER HALLMARKING REGULATIONS:\n`;
    context += `Mandatory Marks (3 Signs): 1. BIS Logo (Triangle), 2. Purity in Carat and Fineness, 3. 6-digit alphanumeric HUID (Hallmark Unique Identification).\n`;
    context += `Purity Grades:\n`;
    for (const p of HALLMARKING_PURITY_TABLE) {
      context += `  * ${p.grade} (${p.fineness} / ${p.finenessPercent}) -> Mark: ${p.standardMark} [${p.useCase}]\n`;
    }
    context += `Consumer Rights: Any consumer can get hallmarked jewellery tested for purity at any BIS recognized AHC for Rs. 45 + GST. Jeweller is liable to pay 2x the shortfall in purity as compensation under BIS Act 2016.\n`;
  }

  context += `</bis_sources>`;
  return context;
}

// Generate citations from retrieved standards & clauses
function generateCitations(standards: BISStandard[], intent: QueryIntent): BISCitation[] {
  const citations: BISCitation[] = [];

  for (const std of standards) {
    for (const cl of std.keyClauses) {
      citations.push({
        documentId: std.id,
        title: `${std.standardNumber}: ${std.title}`,
        standardNumber: std.standardNumber,
        clause: cl.clauseNumber,
        page: cl.pageNumber,
        sourceUrl: std.sourceUrl,
        excerpt: `${cl.title} — ${cl.content.slice(0, 160)}...`
      });
    }

    citations.push({
      documentId: std.id,
      title: `${std.standardNumber} Specification & Testing Requirements`,
      standardNumber: std.standardNumber,
      sourceUrl: std.sourceUrl,
      excerpt: `Covers ${std.scope.slice(0, 150)}... Mandatory QCO: ${std.isMandatoryQCO ? 'Yes' : 'No'}.`
    });
  }

  if (intent === 'SCHEME_QUERY' || intent === 'CERTIFICATION_QUERY') {
    citations.push({
      documentId: 'scheme-1',
      title: 'BIS (Conformity Assessment) Regulations, 2018 — Scheme I (ISI Mark)',
      sourceUrl: 'https://bis.gov.in/index.php/product-certification/product-certification-scheme/',
      excerpt: 'Details grant of licence, factory audit procedures, and Scheme of Inspection and Testing (SIT).'
    });
  }

  if (intent === 'HALLMARKING_QUERY') {
    citations.push({
      documentId: 'is-14111',
      title: 'IS 14111:2023 — Gold and Gold Alloys Fineness and Marking',
      clause: 'Clause 5',
      page: 5,
      sourceUrl: 'https://bis.gov.in/index.php/hallmarking-overview/',
      excerpt: 'Mandates the 3 official hallmarking signs: BIS Triangle, Purity in Carat/Fineness, and 6-digit HUID.'
    });
  }

  return citations.slice(0, 6);
}

// Main Conversational RAG Query Handler
export async function handleChatQuery(
  userQuery: string,
  history: { role: 'user' | 'assistant'; content: string }[] = [],
  preferredLanguage: AppLanguage = 'en'
): Promise<ChatMessage> {
  const intent = detectQueryIntent(userQuery);

  // Handle out of scope
  if (intent === 'OUT_OF_SCOPE') {
    const responses: Record<AppLanguage, string> = {
      en: "I am specifically designed to assist with Indian Standards (IS), Bureau of Indian Standards (BIS) services, certification schemes (ISI, CRS, FMCS), product testing requirements, recognized laboratories, hallmarking, and consumer rights. I cannot answer queries outside the BIS regulatory domain.",
      hi: "मुझे विशेष रूप से भारतीय मानकों (IS), भारतीय मानक ब्यूरो (BIS) सेवाओं, प्रमाणन योजनाओं (ISI, CRS, FMCS), उत्पाद परीक्षण आवश्यकताओं, प्रयोगशालाओं, हॉलमार्किंग और उपभोक्ता अधिकारों में सहायता के लिए डिज़ाइन किया गया है। मैं BIS नियामक क्षेत्र से बाहर के प्रश्नों का उत्तर नहीं दे सकता।",
      gu: "મને ખાસ કરીને ભારતીય માનકો (IS), ભારતીય માનક બ્યુરો (BIS) સેવાઓ, પ્રમાણીકરણ યોજનાઓ (ISI, CRS, FMCS), ઉત્પાદન પરીક્ષણ આવશ્યકતાઓ, માન્ય પ્રયોગશાળાઓ, હોલમાર્કિંગ અને ગ્રાહક અધિકારો માટે બનાવવામાં આવ્યો છે. હું BIS નિયમનકારી ક્ષેત્ર બહારના પ્રશ્નોના જવાબો આપી શકતો નથી."
    };
    return {
      id: `msg-${Date.now()}`,
      role: 'assistant',
      content: responses[preferredLanguage] || responses.en,
      timestamp: new Date().toISOString(),
      intent: 'OUT_OF_SCOPE',
      evidenceLevel: 'high',
      evidenceRationale: 'Question is outside the official scope of Indian Standards and BIS services.',
      followUpSuggestions: [
        'What BIS standard applies to electric water heaters?',
        'How can I verify whether a gold item is hallmarked?',
        'Is BIS certification mandatory for stainless steel bottles?',
        'Find a BIS-recognized testing laboratory near Mumbai.'
      ]
    };
  }

  // Retrieve relevant standards, schemes, labs
  const matchedStandards = searchStandards(userQuery, 3);
  const topStandards = matchedStandards.map(m => m.standard);

  let matchedLabs: typeof BIS_LABORATORIES = [];
  if (intent === 'LABORATORY_SEARCH' || topStandards.length > 0) {
    const labQuery = userQuery.toLowerCase();
    matchedLabs = BIS_LABORATORIES.filter(lab =>
      labQuery.includes(lab.state.toLowerCase()) ||
      labQuery.includes(lab.city.toLowerCase()) ||
      lab.productCategories.some(cat => labQuery.includes(cat.toLowerCase())) ||
      topStandards.some(std => lab.testedStandards.includes(std.standardNumber))
    ).slice(0, 3);

    if (matchedLabs.length === 0) {
      matchedLabs = BIS_LABORATORIES.slice(0, 2);
    }
  }

  const citations = generateCitations(topStandards, intent);

  // Determine evidence level
  let evidenceLevel: EvidenceLevel = 'limited';
  let evidenceRationale = '';

  if (topStandards.length > 0 && matchedStandards[0].score >= 35) {
    evidenceLevel = 'high';
    evidenceRationale = `Exact Indian Standard match (${topStandards[0].standardNumber}) backed by authoritative scope, specific clauses, and Quality Control Order (QCO) gazette records.`;
  } else if (topStandards.length > 0 || intent === 'HALLMARKING_QUERY' || intent === 'SCHEME_QUERY') {
    evidenceLevel = 'moderate';
    evidenceRationale = `Relevant BIS regulatory framework identified, but specific product attributes may require verification against full specification.`;
  } else {
    evidenceLevel = 'limited';
    evidenceRationale = `Insufficient direct matches in the standard dataset for this specific query. Official BIS portal consultation recommended.`;
  }

  // Try calling Gemini 3.8 Flash via @google/genai
  const gemini = getGeminiClient();

  if (gemini) {
    try {
      const contextBlock = buildContextBlock(topStandards, BIS_SCHEMES, matchedLabs, intent);
      const languageInstruction = preferredLanguage === 'hi'
        ? 'Respond fluently in Hindi (हिन्दी). Keep standard numbers (e.g. IS 302-2-21:2018), clause numbers, HUID, and technical abbreviations in English.'
        : preferredLanguage === 'gu'
        ? 'Respond fluently in Gujarati (ગુજરાતી). Keep standard numbers, clause numbers, HUID, and technical abbreviations in English.'
        : 'Respond in clear, professional English.';

      const systemInstruction = `
You are the "BIS Intelligence Assistant" — an authoritative, AI-powered system for Indian Standards and Bureau of Indian Standards (BIS) services.
Your role is to assist industries, MSMEs, startups, laboratories, students, and consumers with high-fidelity, source-backed answers.

CRITICAL GROUNDING RULES:
1. Ground your answer strictly in the provided <bis_sources> data.
2. NEVER fabricate, invent, or hallucinate Indian Standard numbers (e.g. "IS 99999"), non-existent clause numbers, or fake legal requirements.
3. If information cannot be verified from the sources, explicitly state: "I could not verify this information from the available BIS sources."
4. Distinguish clearly between:
   - Confirmed information (explicitly in the standard / QCO)
   - Information inferred from available documents
   - Information requiring official verification
5. Reference specific clauses (e.g. [Clause 4], [Clause 13]) and official documents in your text where applicable.
6. Provide a concise answer first, followed by clear structured sections:
   - Applicable Standards & Scope
   - Mandatory Certification / QCO Status
   - Key Safety & Testing Requirements
   - Step-by-Step Guidance / Next Steps
7. Language requirement: ${languageInstruction}
      `.trim();

      const prompt = `
User Query: "${userQuery}"
Detected Intent: ${intent}

${contextBlock}

Please provide an authoritative, transparent, source-backed answer following the instructions above.
      `.trim();

      const response = await gemini.models.generateContent({
        model: GEMINI_MODEL,
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.2
        }
      });

      const responseText = response.text || '';

      if (responseText.trim()) {
        return {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          content: responseText,
          timestamp: new Date().toISOString(),
          intent,
          evidenceLevel,
          evidenceRationale,
          applicableStandards: topStandards,
          citations,
          certificationProcess: topStandards[0]?.scheme ? [
            '1. Confirm Indian Standard & download Scheme of Inspection and Testing (SIT)',
            '2. Set up required in-house test equipment & obtain calibration certificates',
            '3. File Form-I application on the BIS Manakonline portal',
            '4. Factory audit & sample drawing by BIS inspecting officer',
            '5. Independent laboratory testing at BIS-recognized facility',
            '6. Grant of Certification Marks Licence (CM/L) for ISI Mark'
          ] : undefined,
          testingOverview: topStandards[0]?.testingRequirements || undefined,
          followUpSuggestions: generateFollowUpQuestions(intent, topStandards)
        };
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to deterministic RAG engine:', err);
    }
  }

  // Fallback Deterministic Grounded Engine
  return generateDeterministicResponse(userQuery, intent, topStandards, matchedLabs, evidenceLevel, evidenceRationale, citations, preferredLanguage);
}

function generateFollowUpQuestions(intent: QueryIntent, standards: BISStandard[]): string[] {
  if (standards.length > 0) {
    const std = standards[0];
    return [
      `Is BIS certification mandatory under QCO for ${std.standardNumber}?`,
      `What in-house testing equipment is required for ${std.standardNumber}?`,
      `Which BIS recognized laboratory can test products under ${std.standardNumber}?`,
      `What are the licensing fee concessions for MSMEs for ${std.standardNumber}?`
    ];
  }

  if (intent === 'HALLMARKING_QUERY') {
    return [
      'What are the 3 mandatory marks in a BIS hallmark?',
      'How do I verify a 6-digit HUID on the BIS CARE app?',
      'Can I get my gold jewellery tested at an Assaying & Hallmarking Centre?',
      'What compensation is a consumer entitled to if gold purity is low?'
    ];
  }

  if (intent === 'LABORATORY_SEARCH') {
    return [
      'Find laboratories in Maharashtra for electrical safety testing',
      'What is the difference between BIS Central Lab and a Recognized Lab?',
      'How long does sample testing take under Scheme I?'
    ];
  }

  return [
    'What BIS standard applies to electric water heaters?',
    'What are the mandatory requirements for stainless steel bottles?',
    'How do I check if an ISI mark is authentic?'
  ];
}

// Deterministic Grounded Response Generator
function generateDeterministicResponse(
  query: string,
  intent: QueryIntent,
  standards: BISStandard[],
  labs: BISLaboratory[],
  evidenceLevel: EvidenceLevel,
  evidenceRationale: string,
  citations: BISCitation[],
  language: AppLanguage
): ChatMessage {
  let content = '';

  if (intent === 'HALLMARKING_QUERY') {
    if (language === 'hi') {
      content = `### बीआईएस स्वर्ण और रजत हॉलमार्किंग दिशानिर्देश\n\nबीआईएस नियमों के तहत भारत के 343+ अधिसूचित जिलों में स्वर्ण आभूषणों की हॉलमार्किंग अनिवार्य है।\n\n#### 3 अनिवार्य हॉलमार्क चिन्ह:\n1. **बीआईएस मानक चिह्न (त्रिभुज)**: बीआईएस अनुरूपता का प्रतीक।\n2. **शुद्धता और कैरेट ग्रेड**: उदाहरण के लिए **22K916** (91.6% शुद्ध सोना) या **18K750** (75.0% शुद्ध सोना)।\n3. **6-अंकीय HUID (हॉलमार्क विशिष्ट पहचान संख्या)**: प्रत्येक आभूषण पर लेजर द्वारा उकेरा गया अनूठा अल्फ़ान्यूमेरिक कोड।\n\n**उपभोक्ता अधिकार**: कोई भी उपभोक्ता मात्र ₹45 + GST में किसी भी बीआईएस मान्यता प्राप्त एएचसी (AHC) में आभूषण की शुद्धता जांच करवा सकता है।`;
    } else if (language === 'gu') {
      content = `### બીઆઈએસ સોના અને ચાંદીના હોલમાર્કિંગ માર્ગદર્શિકા\n\nભારતના 343+ સૂચિત જિલ્લાઓમાં સોનાના દાગીના માટે હોલમાર્કિંગ ફરજિયાત છે.\n\n#### 3 ફરજિયાત હોલમાર્ક ચિહ્નો:\n1. **BIS લોગો (ત્રિકોણ)**: સત્તાવાર BIS માન્યતા.\n2. **શુદ્ધતા અને કેરેટ**: દા.ત. **22K916** (91.6% શુદ્ધ સોનું) અથવા **18K750**.\n3. **6-અંકનો HUID કોડ**: દરેક ઘરેણાં પર લેસરથી કોતરેલો અનન્ય ઓળખ નંબર.\n\n**ગ્રાહક અધિકાર**: ગ્રાહક માત્ર ₹45 + GST ચૂકવીને કોઈપણ માન્ય એસેઇંગ સેન્ટર (AHC) ખાતે શુદ્ધતા ચકાસી શકે છે.`;
    } else {
      content = `### Official BIS Gold & Silver Hallmarking Guidance

Under the Bureau of Indian Standards (Hallmarking) Regulations, hallmarking is **mandatory** for gold jewellery in 343+ notified districts across India.

#### The 3 Mandatory Hallmarking Signs on Genuine Jewellery:
1. **BIS Standard Mark**: The triangular official BIS logo certifying conformity.
2. **Purity in Carat and Fineness**: Clearly marked purity grade (e.g., **22K916** for 91.6% purity, **18K750** for 75.0%, **14K585** for 58.5%).
3. **6-Digit Alphanumeric HUID**: Hallmark Unique Identification laser-engraved onto each piece.

#### Consumer Verification & Rights:
- **Instant HUID Verification**: Use the **BIS CARE** mobile app (available on Android & iOS). Enter the 6-digit HUID to see the jeweller's registration name, AHC name, hallmarking date, and certified purity.
- **Testing at AHC**: Any consumer can get their hallmarked jewellery tested for purity at any BIS recognized Assaying & Hallmarking Centre for **₹45 + GST** per article.
- **Penalty for Deficient Purity**: If purity is found lower than marked, the jeweller is legally bound to pay **2 times the shortfall value** to the consumer under the BIS Act, 2016.`;
    }
  } else if (standards.length > 0) {
    const std = standards[0];
    content = `### Applicable Indian Standard: **${std.standardNumber}**

**Title**: ${std.title}  
**Category**: ${std.category} | **Status**: ${std.status}  

#### 1. Scope & Why this Standard Applies
${std.scope}

#### 2. Certification & Legal Mandate
${std.isMandatoryQCO
  ? `⚠️ **MANDATORY QUALITY CONTROL ORDER (QCO) IN EFFECT**:  
This product is strictly regulated under the **${std.qcoDetails?.orderName}** (Gazette Ref: ${std.qcoDetails?.gazetteRef}). Under Section 16 of the BIS Act, 2016, no person shall manufacture, import, distribute, or sell this product without the **BIS Standard Mark (ISI)** under **${std.scheme}**.`
  : `ℹ️ **Voluntary Certification**: Certification under ${std.scheme} is currently voluntary, providing market credibility and tender eligibility.`}

#### 3. Key Clauses & Safety Thresholds
${std.keyClauses.map(cl => `* **${cl.clauseNumber} (${cl.title}, Page ${cl.pageNumber})**: ${cl.content}`).join('\n')}

#### 4. Mandatory Testing Requirements
${std.testingRequirements.map(t => `* ${t}`).join('\n')}

#### 5. Documentation Required for Application
${std.requiredDocuments.map(d => `* ${d}`).join('\n')}`;
  } else {
    content = `### BIS Information Retrieval

Based on your query, we searched the Bureau of Indian Standards database. While several standards address similar industrial domains, please specify your exact product parameters (such as primary raw material, voltage/pressure rating, capacity, or intended end-use) to receive a definitive clause-level recommendation.

**Available Support Areas:**
- Electrical & Electronics Safety (IS 302, IS 16102, IS 16046)
- Mechanical, Cookware & Utensils (IS 14756, IS 17526, IS 2347)
- Construction & Steel (IS 1786, IS 2062)
- Food & Drinking Water (IS 10500, IS 14543)
- Gold & Silver Hallmarking (IS 14111, IS 2112)`;
  }

  return {
    id: `msg-${Date.now()}`,
    role: 'assistant',
    content,
    timestamp: new Date().toISOString(),
    intent,
    evidenceLevel,
    evidenceRationale,
    applicableStandards: standards,
    citations,
    certificationProcess: standards[0]?.scheme ? [
      '1. Identify applicable Indian Standard and SIT guidelines',
      '2. Install required in-house test instruments with valid calibration',
      '3. Submit Form-I on the BIS Manakonline portal',
      '4. Factory inspection and witness testing by BIS auditor',
      '5. Testing of drawn samples at BIS recognized laboratory',
      '6. Grant of Certification Marks Licence (CM/L) for ISI mark'
    ] : undefined,
    testingOverview: standards[0]?.testingRequirements || undefined,
    followUpSuggestions: generateFollowUpQuestions(intent, standards)
  };
}

// Admin RAG Testing Playground inspection
export async function inspectRAGPipeline(query: string): Promise<AdminRAGTestResult> {
  const startTime = Date.now();
  const intent = detectQueryIntent(query);
  const expandedTokens = expandQueryTokens(query);
  const matchedStandards = searchStandards(query, 5);

  const topChunks = matchedStandards.flatMap(m => {
    return m.standard.keyClauses.map(cl => ({
      id: `${m.standard.id}-${cl.clauseNumber}`,
      standardNumber: m.standard.standardNumber,
      title: m.standard.title,
      clause: cl.clauseNumber,
      score: m.score,
      textExcerpt: `[${cl.clauseNumber}] ${cl.title}: ${cl.content}`
    }));
  }).slice(0, 5);

  const chatResponse = await handleChatQuery(query);
  const latencyMs = Date.now() - startTime;

  return {
    query,
    detectedIntent: intent,
    expandedQueryTokens: expandedTokens,
    retrievedChunksCount: topChunks.length,
    topChunks,
    generatedAnswer: chatResponse.content,
    citationsValidated: (chatResponse.citations?.length || 0) > 0,
    evidenceLevel: chatResponse.evidenceLevel || 'moderate',
    latencyMs
  };
}
