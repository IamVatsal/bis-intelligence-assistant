import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Cpu,
  Database,
  Search,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  BarChart3,
  Layers,
  ArrowRight,
  ShieldCheck,
  Clock,
  ThumbsUp,
  FileText
} from 'lucide-react';
import { AdminRAGTestResult, AppLanguage } from '../types/bis.js';

interface AdminSuiteViewProps {
  language: AppLanguage;
  activeSubTab?: 'dashboard' | 'rag' | 'kb';
}

export const AdminSuiteView: React.FC<AdminSuiteViewProps> = ({
  language,
  activeSubTab = 'dashboard'
}) => {
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'rag' | 'kb'>(activeSubTab);
  const [metrics, setMetrics] = useState<any | null>(null);

  // RAG Testing state
  const [testQuery, setTestQuery] = useState('What safety requirements apply to domestic electric heaters?');
  const [isTestingRAG, setIsTestingRAG] = useState(false);
  const [ragTestResult, setRagTestResult] = useState<AdminRAGTestResult | null>(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  useEffect(() => {
    setCurrentTab(activeSubTab);
  }, [activeSubTab]);

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/admin/metrics');
      const data = await res.json();
      setMetrics(data);
    } catch (e) {
      console.error('Failed to fetch admin metrics:', e);
    }
  };

  const handleRunRAGTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testQuery.trim()) return;

    setIsTestingRAG(true);
    try {
      const res = await fetch('/api/admin/rag-test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: testQuery })
      });
      const data = await res.json();
      setRagTestResult(data);
    } catch (e) {
      console.error('RAG test failed:', e);
    } finally {
      setIsTestingRAG(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold border border-amber-500/20">
          <Cpu className="w-3.5 h-3.5 text-amber-600" />
          <span>BIS RAG Evaluation & Administration Console</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Admin Suite & Intelligence Metrics
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Inspect intent classification, monitor citation validity, evaluate retrieval recall@k, and test the RAG pipeline end-to-end.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setCurrentTab('dashboard')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            currentTab === 'dashboard'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Metrics Dashboard
        </button>
        <button
          onClick={() => setCurrentTab('rag')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            currentTab === 'rag'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          RAG Retrieval Playground
        </button>
        <button
          onClick={() => setCurrentTab('kb')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            currentTab === 'kb'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Knowledge Base Index
        </button>
      </div>

      {/* Tab 1: Dashboard */}
      {currentTab === 'dashboard' && metrics && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Total Queries
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
                {metrics.totalQueries}
              </div>
              <p className="text-[11px] text-slate-500">Live conversational requests</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Groundedness Score
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
                {metrics.ragPerformance?.groundednessScore}
              </div>
              <p className="text-[11px] text-slate-500">Hallucination prevention rate</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Retrieval Recall @ 3
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 font-mono">
                {metrics.ragPerformance?.retrievalRecallAt3}
              </div>
              <p className="text-[11px] text-slate-500">Relevant clauses retrieved</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                User Satisfaction
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 font-mono">
                {metrics.satisfactionRate}%
              </div>
              <p className="text-[11px] text-slate-500">{metrics.feedbackCount} recorded reviews</p>
            </div>
          </div>

          {/* Intent Distribution & Evaluation framework */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span>Detected Query Intent Distribution</span>
              </h3>
              <div className="space-y-2">
                {Object.entries(metrics.intentDistribution || {}).map(([intent, count], idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-slate-700">{intent}</span>
                      <span className="font-bold text-slate-900">{count as number}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: `${Math.min(100, ((count as number) / 25) * 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>RAG Scientific Quality Benchmarks</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="font-medium text-slate-700">Mean Reciprocal Rank (MRR)</span>
                  <span className="font-mono font-bold text-slate-900">{metrics.ragPerformance?.meanReciprocalRank}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="font-medium text-slate-700">Citation Completeness</span>
                  <span className="font-mono font-bold text-emerald-700">{metrics.ragPerformance?.citationAccuracy}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="font-medium text-slate-700">Indexed Standards with Full Clauses</span>
                  <span className="font-mono font-bold text-blue-700">{metrics.totalStandardsIndexed} Standards</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="font-medium text-slate-700">Active Mandatory QCO Datasets</span>
                  <span className="font-mono font-bold text-amber-700">{metrics.mandatoryQCOCount} QCO Orders</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: RAG Testing Playground (Section 25 of prompt) */}
      {currentTab === 'rag' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                RAG Pipeline Inspector
              </h3>
              <p className="text-xs text-slate-500">
                Execute a query to trace: Query → Intent Classification → Token Expansion → Hybrid Chunk Retrieval → Ranking → Prompt Context → Citation Validation.
              </p>
            </div>

            <form onSubmit={handleRunRAGTest} className="flex gap-2">
              <input
                type="text"
                value={testQuery}
                onChange={(e) => setTestQuery(e.target.value)}
                placeholder="Enter query to trace RAG pipeline..."
                className="flex-1 text-xs sm:text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600"
              />
              <button
                type="submit"
                disabled={isTestingRAG}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                {isTestingRAG ? 'Tracing...' : 'Run Pipeline'}
              </button>
            </form>
          </div>

          {ragTestResult && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Pipeline summary chips */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-900 font-mono font-bold">
                  Intent: {ragTestResult.detectedIntent}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 font-semibold">
                  Evidence: {ragTestResult.evidenceLevel.toUpperCase()}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono">
                  Latency: {ragTestResult.latencyMs}ms
                </span>
                <span className="px-2.5 py-1 rounded-md bg-purple-100 text-purple-900 font-semibold">
                  Citations Validated: {ragTestResult.citationsValidated ? 'PASSED ✓' : 'FAILED ✗'}
                </span>
              </div>

              {/* Step 1 & 2: Token expansion & Retrieved Chunks */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  1. Query Token Expansion & Synonym Mappings
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {ragTestResult.expandedQueryTokens.map((token, idx) => (
                    <span key={idx} className="font-mono text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200">
                      {token}
                    </span>
                  ))}
                </div>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 pt-2 border-t border-slate-100">
                  2. Top Ranked Knowledge Base Chunks ({ragTestResult.retrievedChunksCount})
                </h4>
                <div className="space-y-2">
                  {ragTestResult.topChunks.map((chunk, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between font-semibold">
                        <span className="text-blue-700 font-mono">{chunk.standardNumber} — {chunk.clause}</span>
                        <span className="text-emerald-700 font-mono text-[11px]">Score: {chunk.score}</span>
                      </div>
                      <p className="text-slate-600 line-clamp-2">
                        {chunk.textExcerpt}
                      </p>
                    </div>
                  ))}
                </div>

                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 pt-2 border-t border-slate-100">
                  3. Generated Answer Output
                </h4>
                <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                  {ragTestResult.generatedAnswer}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Knowledge Base */}
      {currentTab === 'kb' && (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Authoritative Knowledge Ingestion
            </h3>
            <p className="text-xs text-slate-500">
              The BIS Intelligence Assistant indexes Indian Standards, Gazette Quality Control Orders (QCOs), and Scheme of Inspection and Testing (SIT) manuals.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Knowledge Pipeline Active: </span>
              <span>All 15 key standards and QCO gazettes are indexed with semantic vectors and BM25 token indices.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
