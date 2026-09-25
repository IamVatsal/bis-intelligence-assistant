import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, AlertTriangle, Sparkles, ArrowRight } from 'lucide-react';
import { BISStandard } from '../types/bis.js';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStandard: (standard: BISStandard) => void;
  onAskChat: (prompt: string) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onSelectStandard,
  onAskChat
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file && !pastedText.trim()) {
      alert('Please select a file or paste product technical specifications.');
      return;
    }

    setIsAnalyzing(true);
    try {
      let fileBase64 = '';
      let mimeType = '';

      if (file) {
        mimeType = file.type;
        const reader = new FileReader();
        fileBase64 = await new Promise<string>((resolve) => {
          reader.onload = () => {
            const res = reader.result as string;
            resolve(res.split(',')[1] || '');
          };
          reader.readAsDataURL(file);
        });
      }

      const res = await fetch('/api/analyze-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentName: file?.name || 'Pasted Technical Specification',
          textContent: pastedText,
          fileBase64: fileBase64 || undefined,
          mimeType: mimeType || undefined
        })
      });

      const data = await res.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error('Document analysis failed:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Upload Product Specifications & Datasheet
              </h3>
              <p className="text-xs text-slate-500">
                AI extracts product parameters and matches applicable Indian Standards
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* File input area */}
          <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 text-center space-y-3 bg-slate-50/50 transition-colors">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              accept=".pdf,.txt,.doc,.docx,.png,.jpg,.jpeg"
              className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer block space-y-2">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-xs text-slate-600">
                <span className="font-semibold text-blue-600 hover:underline">Click to upload</span> or drag and drop
              </div>
              <p className="text-[11px] text-slate-400">
                Datasheets, PDF product manuals, or laboratory test reports (up to 20MB)
              </p>
            </label>
            {file && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
              </div>
            )}
          </div>

          {/* Or Paste Text */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Or Paste Specification Text / Bill of Materials
            </label>
            <textarea
              rows={4}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="e.g. Model: HydroPro 1000. Material: Food grade austenitic stainless steel Grade 304. Double-walled vacuum insulation. Volume: 1000ml. Intended for beverages..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-600"
            />
          </div>

          {/* Advisory banner */}
          <div className="p-3 rounded-xl bg-amber-50 text-xs text-amber-950 border border-amber-200 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              AI-generated recommendations are informational and should be verified against current official BIS notifications and Gazette orders.
            </p>
          </div>

          {/* Analysis Results */}
          {analysisResult && (
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Compliance Analysis Findings</span>
              </h4>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2 whitespace-pre-line">
                {analysisResult.extractedSummary}
              </div>

              {analysisResult.matchedStandards && analysisResult.matchedStandards.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700">
                    Potentially Applicable Standards:
                  </span>
                  <div className="space-y-2">
                    {analysisResult.matchedStandards.map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-mono font-bold text-blue-700">
                            {item.standard.standardNumber}
                          </span>
                          <h5 className="font-medium text-slate-800 mt-0.5">
                            {item.standard.title}
                          </h5>
                        </div>
                        <button
                          onClick={() => {
                            onClose();
                            onSelectStandard(item.standard);
                          }}
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100"
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-slate-50 text-xs">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium"
          >
            Close
          </button>
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || (!file && !pastedText.trim())}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {isAnalyzing ? (
              <span>Extracting & Matching...</span>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Run Compliance Analysis</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
