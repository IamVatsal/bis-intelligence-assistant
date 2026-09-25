import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Sparkles,
  ArrowRight,
  FileCheck2,
  FlaskConical,
  Gem,
  Award,
  BookOpen,
  Building2,
  HelpCircle,
  TrendingUp,
  Cpu,
  Mic,
  CheckCircle2
} from 'lucide-react';
import { AppLanguage, UserPersona, BISStandard } from '../types/bis.js';
import { TRANSLATIONS } from '../data/translations.js';

interface HomeViewProps {
  language: AppLanguage;
  persona: UserPersona;
  onNavigateToTab: (tab: any) => void;
  onSelectPrompt: (promptText: string) => void;
  onOpenClause: (standard: BISStandard) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  language,
  persona,
  onNavigateToTab,
  onSelectPrompt,
  onOpenClause
}) => {
  const t = TRANSLATIONS[language];
  const [quickSearchInput, setQuickSearchInput] = useState('');

  const sampleQueries = [
    {
      query: 'What BIS standard applies to electric water heaters?',
      category: 'Appliances',
      icon: '⚡'
    },
    {
      query: 'I manufacture stainless steel vacuum bottles. What BIS requirements apply?',
      category: 'MSME',
      icon: '🍶'
    },
    {
      query: 'How can I verify whether a gold jewellery item has genuine hallmarking?',
      category: 'Consumer',
      icon: '💍'
    },
    {
      query: 'What testing is required under IS 302 for household appliances?',
      category: 'Laboratory',
      icon: '🧪'
    },
    {
      query: 'Explain the difference between Scheme I (ISI mark) and Scheme II (CRS).',
      category: 'Certification',
      icon: '📜'
    }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearchInput.trim()) {
      onSelectPrompt(quickSearchInput);
      onNavigateToTab('chat');
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section with National Quality aesthetic */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-slate-800 text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Authoritative BIS Knowledge Base • RAG Powered</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Understand Indian Standards.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200">
              Navigate BIS Services.
            </span>{' '}
            Faster.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Natural Language Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto pt-2">
            <div className="relative flex items-center bg-white/10 hover:bg-white/15 focus-within:bg-white/20 backdrop-blur-md rounded-2xl p-1.5 border border-white/20 shadow-xl transition-all">
              <Search className="w-5 h-5 text-amber-400 ml-3.5 shrink-0" />
              <input
                type="text"
                value={quickSearchInput}
                onChange={(e) => setQuickSearchInput(e.target.value)}
                placeholder="Describe your product (e.g. 1L stainless steel bottle) or enter standard (e.g. IS 302)..."
                className="w-full bg-transparent border-0 px-3 py-3 text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none focus:ring-0"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95 shrink-0 cursor-pointer"
              >
                <span>Ask AI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigateToTab('chat')}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{t.askAssistantBtn}</span>
            </button>
            <button
              onClick={() => onNavigateToTab('find-standards')}
              className="px-5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
            >
              <Search className="w-4 h-4 text-amber-400" />
              <span>{t.findStandardBtn}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Suggested Prompt Chips */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Frequently Asked BIS Inquiries
          </h2>
          <span className="text-xs text-slate-400">Click to run immediately</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sampleQueries.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                onSelectPrompt(item.query);
                onNavigateToTab('chat');
              }}
              className="text-left p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors">
                  {item.category}
                </span>
                <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-900 transition-colors line-clamp-2">
                  {item.query}
                </p>
              </div>
              <div className="flex items-center justify-end text-xs font-medium text-blue-600 pt-3 group-hover:translate-x-0.5 transition-transform">
                <span>Inquire</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Key National Standards Assurance Statistics */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-blue-600">
            <BookOpen className="w-4 h-4" />
            <span className="text-xs font-bold uppercase text-slate-500">Indian Standards</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
            20,000+
          </div>
          <p className="text-xs text-slate-500">
            Formulated across 15 engineering divisions
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-amber-600">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold uppercase text-slate-500">Mandatory QCOs</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
            800+ Products
          </div>
          <p className="text-xs text-slate-500">
            Mandatory ISI mark under Section 16
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-emerald-600">
            <FlaskConical className="w-4 h-4" />
            <span className="text-xs font-bold uppercase text-slate-500">Recognized Labs</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
            1,500+
          </div>
          <p className="text-xs text-slate-500">
            Central, Regional, and NABL accredited
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center gap-2 text-indigo-600">
            <Gem className="w-4 h-4" />
            <span className="text-xs font-bold uppercase text-slate-500">Hallmarking</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
            343+ Districts
          </div>
          <p className="text-xs text-slate-500">
            Mandatory HUID gold hallmarking
          </p>
        </div>
      </section>

      {/* Target User Gateways (Section 3 of Prompt) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Tailored Compliance & Intelligence Pathways
          </h2>
          <p className="text-xs text-slate-500">
            Choose your role to get context-aware answers, step-by-step documentation, and testing roadmaps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                Industry & Large Manufacturers
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Determine mandatory QCO enforcement dates, factory audit preparations, in-house laboratory equipment checklists, and Scheme I licensing.
              </p>
            </div>
            <button
              onClick={() => {
                onSelectPrompt('Which BIS standards and certification requirements apply to electrical storage water heaters?');
                onNavigateToTab('chat');
              }}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1.5"
            >
              <span>Explore Industrial Safety (IS 302)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                MSMEs & Startups
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Take advantage of 50% marking fee concessions, Simplified Procedure (Option 2), and immediate identification of voluntary vs mandatory standards.
              </p>
            </div>
            <button
              onClick={() => {
                onSelectPrompt('I am starting a business manufacturing stainless steel bottles. What BIS requirements apply?');
                onNavigateToTab('chat');
              }}
              className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1.5"
            >
              <span>View MSME Bottle Guide (IS 17526)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">
                Consumers & Citizen Rights
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Learn how to verify genuine ISI marks via CM/L license numbers, decode 6-digit HUID gold purity, and file consumer grievances on the BIS CARE app.
              </p>
            </div>
            <button
              onClick={() => onNavigateToTab('hallmarking')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 flex items-center gap-1.5"
            >
              <span>Verify Gold Hallmarks (HUID)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Core Indian Standards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              High-Impact Indian Standards Under Active QCOs
            </h2>
            <p className="text-xs text-slate-500">
              Browse top regulated standards with clause extracts and mandatory testing criteria.
            </p>
          </div>
          <button
            onClick={() => onNavigateToTab('standards')}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1"
          >
            <span>View All Standards</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  IS 302-2-21:2018
                </span>
                <h4 className="font-bold text-sm text-slate-900 mt-1">
                  Electric Storage Water Heaters (Geysers)
                </h4>
              </div>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                Mandatory QCO
              </span>
            </div>
            <p className="text-xs text-slate-600 line-clamp-2">
              Covers safety, leakage current at operating temperature (&lt;1.0 mA), dry-heating thermal cut-out actuation, and hydrostatic tank pressure testing.
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
              <span className="text-slate-500">Scheme I (ISI Mark)</span>
              <button
                onClick={() => onSelectPrompt('Explain the requirements of IS 302 for household electrical appliances')}
                className="text-blue-700 font-semibold hover:underline"
              >
                Inspect Clauses →
              </button>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 transition-all shadow-xs space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                  IS 17526:2021
                </span>
                <h4 className="font-bold text-sm text-slate-900 mt-1">
                  Stainless Steel Vacuum Flasks & Insulated Bottles
                </h4>
              </div>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                Mandatory QCO
              </span>
            </div>
            <p className="text-xs text-slate-600 line-clamp-2">
              Mandates food-grade SS 304 (IS 6911), 6-hour thermal temperature retention (&gt;70°C), inverted seal leak tightness, and 1.2 m drop test.
            </p>
            <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
              <span className="text-slate-500">Scheme I (ISI Mark)</span>
              <button
                onClick={() => onSelectPrompt('What BIS requirements apply to stainless steel insulated water bottles under IS 17526?')}
                className="text-blue-700 font-semibold hover:underline"
              >
                Inspect Clauses →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
