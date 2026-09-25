import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';
import { BISStandard, StandardRecommendationResult, ProductRecommendationRequest, AppLanguage } from '../types/bis.js';

interface FindStandardsViewProps {
  language: AppLanguage;
  onOpenClause: (standard: BISStandard) => void;
  onAskChat: (prompt: string) => void;
}

export const FindStandardsView: React.FC<FindStandardsViewProps> = ({
  language,
  onOpenClause,
  onAskChat
}) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('');
  const [capacityOrRating, setCapacityOrRating] = useState('');
  const [intendedUse, setIntendedUse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<StandardRecommendationResult[] | null>(null);

  const samplePresets = [
    {
      label: '1L Stainless Steel Insulated Flask',
      name: 'Stainless steel insulated water bottle',
      desc: 'Double-walled vacuum insulated container for keeping water hot or cold for 24 hours.',
      mat: 'Stainless Steel SS 304',
      cap: '1 Litre',
      use: 'Beverage storage'
    },
    {
      label: '25L Electric Storage Geyser',
      name: 'Electric stationary storage water heater',
      desc: 'Domestic bathroom geyser with heating element and thermostat, 230V single phase.',
      mat: 'CRCA steel / Enamel coated inner tank',
      cap: '25 Litres, 2000 Watts',
      use: 'Domestic water heating'
    },
    {
      label: '9W Residential LED Bulb',
      name: 'Self-ballasted LED lamp',
      desc: 'B22d base 9 watt LED bulb for residential indoor general lighting with built-in driver.',
      mat: 'Polycarbonate & Aluminium heatsink',
      cap: '9W, 230V AC',
      use: 'Home lighting'
    },
    {
      label: 'Fe 500D TMT Reinforcement Bars',
      name: 'High strength deformed steel bars',
      desc: 'Thermo-mechanically treated rebars for concrete reinforcement in building construction.',
      mat: 'Low carbon micro-alloyed steel',
      cap: '12mm & 16mm diameter',
      use: 'Civil construction'
    }
  ];

  const applyPreset = (preset: typeof samplePresets[0]) => {
    setProductName(preset.name);
    setDescription(preset.desc);
    setMaterial(preset.mat);
    setCapacityOrRating(preset.cap);
    setIntendedUse(preset.use);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim()) return;

    setIsLoading(true);
    try {
      const payload: ProductRecommendationRequest = {
        productName,
        description,
        material,
        capacityOrRating,
        intendedUse
      };

      const response = await fetch('/api/recommend-standards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      setResults(data.recommendations || []);
    } catch (err) {
      console.error('Recommendation failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
          <Search className="w-3.5 h-3.5 text-blue-600" />
          <span>Product-to-Standard Discovery Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Find Applicable Indian Standards
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Describe your product specifications in natural language. Our hybrid matching engine evaluates material grades, dimensions, power ratings, and construction against official BIS scopes.
        </p>
      </div>

      {/* Preset quick buttons */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Try Quick Examples:
        </span>
        <div className="flex flex-wrap gap-2">
          {samplePresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(preset)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 transition-colors shadow-2xs"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSearch} className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Product Name / Title *
            </label>
            <input
              type="text"
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Stainless steel insulated water bottle, Domestic pressure cooker, LED bulb..."
              className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Detailed Product Description & Construction
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Double-walled vacuum flask designed for storing hot coffee and chilled water, featuring a screw stopper with food grade silicone gasket."
              className="w-full text-sm p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Material
              </label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="e.g. Stainless Steel SS 304, Aluminium, HDPE"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Capacity / Voltage / Rating
              </label>
              <input
                type="text"
                value={capacityOrRating}
                onChange={(e) => setCapacityOrRating(e.target.value)}
                placeholder="e.g. 1 Litre, 230V 2kW, 100 kPa"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Intended End-Use
              </label>
              <input
                type="text"
                value={intendedUse}
                onChange={(e) => setIntendedUse(e.target.value)}
                placeholder="e.g. Food contact, Bathroom, Outdoor"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            Results cross-reference both mandatory QCOs and voluntary standards.
          </span>
          <button
            type="submit"
            disabled={isLoading || !productName.trim()}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-transform active:scale-95 cursor-pointer"
          >
            {isLoading ? (
              <span>Matching Scopes...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Find Applicable Standards</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Results Section */}
      {results && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Matched Indian Standards ({results.length})
            </h2>
            <span className="text-xs text-slate-500">
              Ranked by scope alignment & parameter coverage
            </span>
          </div>

          {results.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">
                No Direct Standard Match Found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                No exact standard matched these specifications in the indexed dataset. Try broadening your keywords or ask our AI Conversational Assistant.
              </p>
              <button
                onClick={() => onAskChat(`Which BIS standard applies to: ${productName}?`)}
                className="mt-3 px-4 py-2 bg-blue-50 text-blue-700 text-xs font-semibold rounded-lg hover:bg-blue-100 inline-flex items-center gap-1.5"
              >
                <span>Ask AI Conversational Assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((res, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all shadow-xs space-y-4"
                >
                  {/* Result Header */}
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                          {res.standard.standardNumber}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                            res.relevanceLevel === 'High'
                              ? 'bg-emerald-100 text-emerald-800'
                              : res.relevanceLevel === 'Moderate'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          Relevance: {res.relevanceLevel} ({res.relevanceScore}% match)
                        </span>
                        {res.isMandatory ? (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
                            Mandatory QCO
                          </span>
                        ) : (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700">
                            Voluntary
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-2">
                        {res.standard.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenClause(res.standard)}
                        className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 text-blue-700 text-xs font-semibold flex items-center gap-1.5 transition-colors bg-slate-50"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Inspect Clauses</span>
                      </button>
                    </div>
                  </div>

                  {/* Why it may apply (Section 5 requirement) */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Why it may apply:
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {res.whyItApplies}
                    </p>
                  </div>

                  {/* Coverage Checklist (Material, Product Type, Capacity, Performance) */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                      Standard Coverage Analysis
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {res.coverageChecklist.map((check, cIdx) => (
                        <div
                          key={cIdx}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-50/70 border border-slate-100"
                        >
                          <span className="text-slate-700 font-medium flex items-center gap-2">
                            <CheckCircle2 className={`w-3.5 h-3.5 ${check.matched ? 'text-emerald-600' : 'text-slate-300'}`} />
                            {check.feature}
                          </span>
                          <span className="font-mono text-[10px] text-slate-400">
                            {check.clauseRef}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mandatory QCO Warning Box */}
                  {res.qcoWarning && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="font-bold text-amber-900">Legal Certification Obligation: </span>
                        <span>{res.qcoWarning}</span>
                      </div>
                    </div>
                  )}

                  {/* Action row */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-500">
                      Governing Scheme: <strong className="text-slate-700">{res.standard.scheme}</strong>
                    </span>
                    <button
                      onClick={() => onAskChat(`I want to get BIS certification under ${res.standard.standardNumber} for my product. What is the step-by-step procedure?`)}
                      className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
                    >
                      <span>Plan Certification Roadmap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
