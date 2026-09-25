import React from 'react';
import { Bookmark, FileText, Trash2, ArrowRight, ShieldCheck, Download, Share2 } from 'lucide-react';
import { BISStandard } from '../types/bis.js';

interface SavedSourcesViewProps {
  savedStandards: BISStandard[];
  onRemoveBookmark: (id: string) => void;
  onOpenClause: (standard: BISStandard) => void;
  onAskChat: (prompt: string) => void;
}

export const SavedSourcesView: React.FC<SavedSourcesViewProps> = ({
  savedStandards,
  onRemoveBookmark,
  onOpenClause,
  onAskChat
}) => {
  const exportSavedDossier = () => {
    const text = savedStandards.map(s => `
========================================
STANDARD: ${s.standardNumber}
TITLE: ${s.title}
CATEGORY: ${s.category} (Year ${s.year})
MANDATORY QCO: ${s.isMandatoryQCO ? `Yes - ${s.qcoDetails?.orderName}` : 'No (Voluntary)'}
SCHEME: ${s.scheme}
SCOPE: ${s.scope}
KEY CLAUSES:
${s.keyClauses.map(c => `  - ${c.clauseNumber} (${c.title}): ${c.content}`).join('\n')}
TESTING MANDATES:
${s.testingRequirements.map(t => `  - ${t}`).join('\n')}
OFFICIAL SOURCE: ${s.sourceUrl}
========================================
`).join('\n\n');

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `BIS_Compliance_Dossier_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold">
            <Bookmark className="w-3.5 h-3.5 text-blue-700" />
            <span>Saved Compliance References</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Saved Sources & Bookmarks
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl">
            Keep track of relevant Indian Standards, required testing clauses, and quality manuals for your industrial manufacturing or consumer records.
          </p>
        </div>

        {savedStandards.length > 0 && (
          <button
            onClick={exportSavedDossier}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Compliance Dossier</span>
          </button>
        )}
      </div>

      {savedStandards.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
          <Bookmark className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-sm">
            No Bookmarked Standards Yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            When inspecting standards in the Standards Explorer or AI Assistant, click "Save Standard" to bookmark them here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedStandards.map((std) => (
            <div
              key={std.id}
              className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-xs space-y-3"
            >
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md">
                      {std.standardNumber}
                    </span>
                    {std.isMandatoryQCO && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                        Mandatory QCO
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
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-400 text-blue-700 text-xs font-semibold flex items-center gap-1 bg-slate-50"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Clauses</span>
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(std.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2">
                {std.scope}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Scheme: <strong className="text-slate-700">{std.scheme}</strong></span>
                <button
                  onClick={() => onAskChat(`What are the testing and documentation requirements for ${std.standardNumber}?`)}
                  className="text-blue-700 hover:text-blue-900 font-semibold"
                >
                  Ask AI About This Standard →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
