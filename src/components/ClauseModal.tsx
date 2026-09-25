import React from 'react';
import { BISStandard, BISClause } from '../types/bis.js';
import { X, ExternalLink, ShieldCheck, FileText, CheckCircle2, Bookmark, Share2 } from 'lucide-react';

interface ClauseModalProps {
  standard: BISStandard | null;
  selectedClause?: BISClause | null;
  onClose: () => void;
  onSaveBookmark?: (standard: BISStandard) => void;
  isBookmarked?: boolean;
}

export const ClauseModal: React.FC<ClauseModalProps> = ({
  standard,
  selectedClause,
  onClose,
  onSaveBookmark,
  isBookmarked = false
}) => {
  if (!standard) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100 bg-slate-50/80">
          <div className="space-y-1.5 pr-8">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-blue-100 text-blue-800 font-mono">
                {standard.standardNumber}
              </span>
              {standard.isMandatoryQCO ? (
                <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-100 text-amber-900 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  Mandatory QCO in Force
                </span>
              ) : (
                <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-100 text-emerald-800">
                  Voluntary Certification
                </span>
              )}
              <span className="text-xs text-slate-500 font-medium">
                {standard.category} • Year {standard.year}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-snug">
              {standard.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Active Clause Highlight if specified */}
          {selectedClause && (
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  Inspecting {selectedClause.clauseNumber}: {selectedClause.title}
                </span>
                <span className="text-xs font-mono text-blue-600 bg-blue-100/80 px-2 py-0.5 rounded">
                  Page {selectedClause.pageNumber}
                </span>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-sans font-medium">
                "{selectedClause.content}"
              </p>
              {selectedClause.isMandatory && (
                <div className="flex items-center gap-1.5 text-xs text-amber-800 font-medium pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                  Strict conformity required during BIS laboratory testing
                </div>
              )}
            </div>
          )}

          {/* Scope */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Official Standard Scope
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {standard.scope}
            </p>
          </div>

          {/* Mandatory QCO Details if applicable */}
          {standard.isMandatoryQCO && standard.qcoDetails && (
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                Quality Control Order (QCO) Notification
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-amber-950">
                <div>
                  <span className="text-slate-500 font-normal">Order Name:</span>{' '}
                  <span className="font-semibold">{standard.qcoDetails.orderName}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-normal">Notifying Ministry:</span>{' '}
                  <span className="font-semibold">{standard.qcoDetails.ministry}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-normal">Enforcement Date:</span>{' '}
                  <span className="font-semibold">{standard.qcoDetails.effectiveDate}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-normal">Gazette Reference:</span>{' '}
                  <span className="font-semibold font-mono">{standard.qcoDetails.gazetteRef}</span>
                </div>
              </div>
            </div>
          )}

          {/* All Key Clauses */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Authoritative Clauses in this Standard ({standard.keyClauses.length})
            </h4>
            <div className="space-y-2.5">
              {standard.keyClauses.map((clause, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border transition-all ${
                    selectedClause?.clauseNumber === clause.clauseNumber
                      ? 'border-blue-500 bg-blue-50/30'
                      : 'border-slate-200/80 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1">
                    <span className="text-blue-900 font-mono">{clause.clauseNumber} — {clause.title}</span>
                    <span className="text-slate-400 font-normal">Page {clause.pageNumber}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {clause.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Testing Requirements */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Key Mandatory Tests Specified in SIT
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {standard.testingRequirements.map((test, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{test}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Required Documents */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Required Factory Documentation
            </h4>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
              <ul className="list-disc list-inside text-xs text-slate-700 space-y-1">
                {standard.requiredDocuments.map((doc, idx) => (
                  <li key={idx}>{doc}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Standards */}
          {standard.relatedStandards.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Related Standards & Component References
              </h4>
              <div className="flex flex-wrap gap-2">
                {standard.relatedStandards.map((rel, idx) => (
                  <span key={idx} className="text-xs font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                    {rel}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-slate-50 text-xs">
          <div className="text-slate-500">
            Last Updated in Catalog: <span className="font-medium text-slate-700">{standard.lastUpdated}</span>
          </div>
          <div className="flex items-center gap-2">
            {onSaveBookmark && (
              <button
                onClick={() => onSaveBookmark(standard)}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-colors ${
                  isBookmarked
                    ? 'bg-amber-100 text-amber-900 border border-amber-200'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
                {isBookmarked ? 'Saved' : 'Save Standard'}
              </button>
            )}
            <a
              href={standard.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>BIS Connect Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
