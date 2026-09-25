import React from 'react';
import {
  Home,
  MessageSquare,
  Search,
  FileCheck2,
  FlaskConical,
  Gem,
  Users2,
  BookOpen,
  BookmarkCheck,
  SlidersHorizontal,
  LayoutDashboard,
  Database,
  Cpu,
  HelpCircle,
  ShieldCheck,
  X
} from 'lucide-react';
import { AppLanguage, UserPersona } from '../types/bis.js';
import { TRANSLATIONS } from '../data/translations.js';

export type MainNavTab =
  | 'home'
  | 'chat'
  | 'find-standards'
  | 'certification'
  | 'laboratories'
  | 'hallmarking'
  | 'consumer'
  | 'standards'
  | 'saved'
  | 'admin-dashboard'
  | 'admin-rag'
  | 'admin-kb'
  | 'settings';

interface SidebarProps {
  activeTab: MainNavTab;
  onSelectTab: (tab: MainNavTab) => void;
  language: AppLanguage;
  persona: UserPersona;
  isAdminMode: boolean;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  savedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  language,
  persona,
  isAdminMode,
  isOpenMobile,
  onCloseMobile,
  savedCount
}) => {
  const t = TRANSLATIONS[language];

  const mainNavItems = [
    { id: 'home', label: t.navHome, icon: Home, badge: null },
    { id: 'chat', label: t.navChat, icon: MessageSquare, badge: 'AI' },
    { id: 'find-standards', label: t.navFindStandards, icon: Search, badge: 'Smart' },
    { id: 'certification', label: t.navCertification, icon: FileCheck2, badge: null },
    { id: 'laboratories', label: t.navLabs, icon: FlaskConical, badge: 'NABL' },
    { id: 'hallmarking', label: t.navHallmarking, icon: Gem, badge: 'HUID' },
    { id: 'consumer', label: t.navConsumer, icon: Users2, badge: null },
    { id: 'standards', label: t.navStandards, icon: BookOpen, badge: '20K+' },
    { id: 'saved', label: t.navSaved, icon: BookmarkCheck, badge: savedCount > 0 ? savedCount : null },
  ];

  const adminNavItems = [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
    { id: 'admin-rag', label: 'RAG Testing Lab', icon: Cpu },
    { id: 'admin-kb', label: 'Knowledge Base', icon: Database },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-16 z-50 lg:z-30 h-screen lg:h-[calc(100vh-4.25rem)] w-64 bg-slate-900 border-r border-slate-800 text-slate-300 flex flex-col transition-transform duration-200 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Mobile Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-white text-sm">BIS Intelligence</span>
          </div>
          <button onClick={onCloseMobile} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Persona quick indicator in sidebar */}
        <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-950/40">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-0.5">
            Active Persona Mode
          </div>
          <div className="text-xs font-semibold text-amber-400 capitalize flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {persona.replace('_', ' ')}
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Main User Navigation */}
          <div className="space-y-1">
            <div className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Services & Tools
            </div>
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id as MainNavTab);
                    onCloseMobile();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm font-bold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                        isActive
                          ? 'bg-blue-800 text-white'
                          : 'bg-slate-800 text-amber-400 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Admin Management Navigation if Admin Mode */}
          {isAdminMode && (
            <div className="pt-2 border-t border-slate-800/80 space-y-1">
              <div className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center justify-between">
                <span>Admin Suite</span>
                <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded">RAG</span>
              </div>
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id as MainNavTab);
                      onCloseMobile();
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'text-amber-200/80 hover:bg-slate-800 hover:text-amber-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 text-[11px] text-slate-500">
          <div className="flex items-center justify-between mb-1">
            <span className="font-semibold text-slate-400">BIS Knowledge Base</span>
            <span className="text-emerald-400 font-mono text-[10px] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Connected
            </span>
          </div>
          <p className="text-[10px] text-slate-500">
            IS Catalog 2026 • Manakonline API v2
          </p>
        </div>
      </aside>
    </>
  );
};
