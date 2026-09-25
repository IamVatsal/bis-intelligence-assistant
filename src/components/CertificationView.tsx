import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
  Layers,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { BISScheme, AppLanguage } from '../types/bis.js';
import { BIS_SCHEMES } from '../../server/data/bisData.js';

interface CertificationViewProps {
  language: AppLanguage;
  onAskChat: (prompt: string) => void;
}

export const CertificationView: React.FC<CertificationViewProps> = ({
  language,
  onAskChat
}) => {
  const [selectedSchemeId, setSelectedSchemeId] = useState<string>('scheme-1');
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});

  const activeScheme = BIS_SCHEMES.find(s => s.id === selectedSchemeId) || BIS_SCHEMES[0];

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepNumber]: !prev[stepNumber]
    }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
          <FileCheck2 className="w-3.5 h-3.5 text-amber-700" />
          <span>BIS Conformity Assessment Framework</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          BIS Certification Schemes & Licensing Guide
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Learn how to obtain the BIS Standard Mark (ISI mark), Compulsory Registration (CRS), or Foreign Manufacturer approval with clear procedural timelines and document readiness.
        </p>
      </div>

      {/* Scheme Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {BIS_SCHEMES.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => {
              setSelectedSchemeId(scheme.id);
              setCompletedSteps({});
            }}
            className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between space-y-2 ${
              selectedSchemeId === scheme.id
                ? 'bg-blue-600 text-white border-blue-700 shadow-md'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                selectedSchemeId === scheme.id ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {scheme.code}
              </span>
              <h3 className="font-bold text-xs sm:text-sm mt-2 line-clamp-2">
                {scheme.name}
              </h3>
            </div>
            <span className={`text-[11px] font-medium ${selectedSchemeId === scheme.id ? 'text-blue-100' : 'text-slate-500'}`}>
              {scheme.type}
            </span>
          </button>
        ))}
      </div>

      {/* Active Scheme Overview Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-start justify-between flex-wrap gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1 max-w-2xl">
            <span className="font-mono text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded">
              {activeScheme.governingRegulation}
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">
              {activeScheme.name}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {activeScheme.description}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href={activeScheme.applicationPortal}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span>Apply on Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => onAskChat(`Explain the detailed document requirements for ${activeScheme.name}`)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
            >
              Ask AI About Requirements
            </button>
          </div>
        </div>

        {/* Quick parameters grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
              Eligibility Criteria
            </span>
            <p className="text-slate-800 font-medium">
              {activeScheme.eligibility}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
              Fee Structure Overview
            </span>
            <p className="text-slate-800 font-medium">
              {activeScheme.feesOverview}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
              Sample Covered Products
            </span>
            <p className="text-slate-800 font-medium">
              {activeScheme.applicableProducts.slice(0, 3).join(', ')}...
            </p>
          </div>
        </div>

        {/* Interactive Step-by-Step Timeline (Section 6 Requirement) */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Step-by-Step Licensing Procedure ({activeScheme.steps.length} Steps)</span>
            </h3>
            <span className="text-xs text-slate-500">
              Click checkboxes to track your preparation progress
            </span>
          </div>

          <div className="space-y-3 relative before:absolute before:inset-0 before:left-4 before:h-full before:w-0.5 before:bg-slate-200">
            {activeScheme.steps.map((step) => {
              const isDone = !!completedSteps[step.stepNumber];
              return (
                <div
                  key={step.stepNumber}
                  className={`relative pl-10 p-4 rounded-xl border transition-all ${
                    isDone
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Step circle indicator */}
                  <button
                    onClick={() => toggleStep(step.stepNumber)}
                    className={`absolute left-2.5 top-5 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] transition-colors ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.stepNumber}
                  </button>

                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <h4 className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      Est. {step.timeline}
                    </span>
                  </div>

                  {step.documentsRequired.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500">
                      <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-slate-700">Required Documents: </span>
                        <span>{step.documentsRequired.join(', ')}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
