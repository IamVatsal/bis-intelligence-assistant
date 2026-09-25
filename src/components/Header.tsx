import React from 'react';
import { Shield, Sparkles, Globe, User, Settings, Terminal, Menu, X, Check } from 'lucide-react';
import { AppLanguage, UserPersona } from '../types/bis.js';
import { TRANSLATIONS } from '../data/translations.js';

interface HeaderProps {
  currentLanguage: AppLanguage;
  onLanguageChange: (lang: AppLanguage) => void;
  currentPersona: UserPersona;
  onPersonaChange: (persona: UserPersona) => void;
  isAdminMode: boolean;
  onToggleAdmin: () => void;
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  currentPersona,
  onPersonaChange,
  isAdminMode,
  onToggleAdmin,
  onOpenMobileMenu
}) => {
  const t = TRANSLATIONS[currentLanguage];

  const personaLabels: Record<UserPersona, string> = {
    manufacturer: 'Industry / Manufacturer',
    msme: 'MSME / Startup',
    consumer: 'Consumer',
    student: 'Student / Researcher',
    laboratory: 'Testing Laboratory',
    professional: 'BIS Professional'
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-md">
      {/* Tricolor hairline accent bar */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-amber-500"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-emerald-600"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-amber-500 p-0.5 flex items-center justify-center shadow-lg">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                    BIS Intelligence
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    MANAK AI
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-md">
                  Bureau of Indian Standards Knowledge & Compliance Platform
                </p>
              </div>
            </div>
          </div>

          {/* Right Controls: Language, Persona, Admin */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800/90 rounded-lg p-0.5 border border-slate-700/80 text-xs font-medium">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currentLanguage === 'en'
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currentLanguage === 'hi'
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => onLanguageChange('gu')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  currentLanguage === 'gu'
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                ગુજરાતી
              </button>
            </div>

            {/* Persona Selector Dropdown */}
            <div className="relative hidden md:block">
              <div className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 px-3 py-1.5 rounded-lg">
                <User className="w-3.5 h-3.5 text-amber-400" />
                <select
                  value={currentPersona}
                  onChange={(e) => onPersonaChange(e.target.value as UserPersona)}
                  className="bg-transparent text-slate-200 font-medium focus:outline-none cursor-pointer pr-1"
                >
                  <option value="manufacturer" className="bg-slate-900 text-white">🏭 Industry / Manufacturer</option>
                  <option value="msme" className="bg-slate-900 text-white">🚀 MSME / Startup</option>
                  <option value="consumer" className="bg-slate-900 text-white">👤 Consumer</option>
                  <option value="student" className="bg-slate-900 text-white">🎓 Student / Researcher</option>
                  <option value="laboratory" className="bg-slate-900 text-white">🧪 Testing Laboratory</option>
                  <option value="professional" className="bg-slate-900 text-white">⚖️ BIS Professional</option>
                </select>
              </div>
            </div>

            {/* Admin Switch */}
            <button
              onClick={onToggleAdmin}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                isAdminMode
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-bold'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300 border-slate-700'
              }`}
              title="Toggle Admin RAG Inspection & Ingestion Suite"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isAdminMode ? 'Admin Active' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
