import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { AppLanguage } from '../types/bis.js';
import { TRANSLATIONS } from '../data/translations.js';

interface DisclaimerBannerProps {
  language: AppLanguage;
  compact?: boolean;
}

export const DisclaimerBanner: React.FC<DisclaimerBannerProps> = ({ language, compact = false }) => {
  const t = TRANSLATIONS[language];

  if (compact) {
    return (
      <div className="bg-slate-100/90 border-t border-slate-200 py-2 px-4 text-center text-[11px] text-slate-500 font-sans">
        <span className="font-semibold text-slate-700">Official Disclaimer: </span>
        {t.disclaimer}
      </div>
    );
  }

  return (
    <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-950 font-sans shadow-xs">
      <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
      <div className="space-y-0.5 leading-relaxed">
        <span className="font-bold text-amber-900">Regulatory Advisory & Official Disclaimer: </span>
        <span className="text-amber-900/90">{t.disclaimer}</span>
      </div>
    </div>
  );
};
