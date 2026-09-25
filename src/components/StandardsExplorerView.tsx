import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  ShieldCheck,
  FileText,
  ExternalLink,
  ChevronRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { BISStandard, AppLanguage } from '../types/bis.js';

interface StandardsExplorerViewProps {
  language: AppLanguage;
  onOpenClause: (standard: BISStandard) => void;
  onAskChat: (prompt: string) => void;
}

export const StandardsExplorerView: React.FC<StandardsExplorerViewProps> = ({
  language,
  onOpenClause,
  onAskChat
}) => {
  const [standards, setStandards] = useState<BISStandard[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [mandatoryOnly, setMandatoryOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStandards();
  }, [selectedCategory, mandatoryOnly]);

  const fetchStandards = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (mandatoryOnly) params.append('mandatory', 'true');

      const res = await fetch(`/api/standards?${params.toString()}`);
      const data = await res.json();
      setStandards(data.standards || []);
    } catch (e) {
      console.error('Failed to fetch standards:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStandards();
  };

  const categories = [
    'All',
    'Electrical & Electronics',
    'Mechanical & Metal',
    'Consumer & Toys',
    'Food, Water & Agriculture',
    'Civil & Structural',
    'Jewellery & Hallmarking'
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-blue-700" />
          <span>Indian Standards Bureau Catalog</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Indian Standards Explorer
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Search authoritative Indian Standards (IS), inspect active Quality Control Orders (QCOs), view safety threshold clauses, and download SIT inspection frameworks.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search standard number (e.g. IS 302, IS 17526) or title (e.g. water heater, bottle, toys)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-600">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium select-none">
            <input
              type="checkbox"
              checked={mandatoryOnly}
              onChange={(e) => setMandatoryOnly(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
            />
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              Mandatory QCO Products Only
            </span>
          </label>
        </div>
      </div>

      {/* Catalog Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Standards Catalog ({standards.length})</span>
          <span>Authoritative BIS Publications</span>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-xs text-slate-500">
            Loading standards catalog...
          </div>
        ) : standards.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
            No standards found matching your query.
          </div>
        ) : (
          <div className="space-y-3">
            {standards.map((std) => (
              <div
                key={std.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all shadow-xs space-y-3"
              >
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                        {std.standardNumber}
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">
                        {std.category} • Year {std.year}
                      </span>
                      {std.isMandatoryQCO ? (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-amber-700" />
                          Mandatory QCO
                        </span>
                      ) : (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800">
                          Voluntary
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-2">
                      {std.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenClause(std)}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:border-blue-500 text-blue-700 text-xs font-semibold flex items-center gap-1.5 transition-colors bg-slate-50"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Inspect Clauses ({std.keyClauses.length})</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {std.scope}
                </p>

                {/* Keywords */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {std.keywords.slice(0, 6).map((kw, kIdx) => (
                    <span key={kIdx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      #{kw}
                    </span>
                  ))}
                </div>

                {/* Footer details */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 flex-wrap gap-2">
                  <div className="flex items-center gap-4">
                    <span>Scheme: <strong className="text-slate-700">{std.scheme}</strong></span>
                    <span>Status: <strong className="text-slate-700">{std.status}</strong></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onAskChat(`What are the testing and documentation requirements for ${std.standardNumber}?`)}
                      className="text-blue-700 hover:text-blue-900 font-semibold"
                    >
                      Ask AI Assistant →
                    </button>
                    <a
                      href={std.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-blue-600"
                      title="View on Official BIS Portal"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
