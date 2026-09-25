import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.js';
import { Sidebar, MainNavTab } from './components/Sidebar.js';
import { HomeView } from './components/HomeView.js';
import { ChatView } from './components/ChatView.js';
import { FindStandardsView } from './components/FindStandardsView.js';
import { CertificationView } from './components/CertificationView.js';
import { LabFinderView } from './components/LabFinderView.js';
import { HallmarkingView } from './components/HallmarkingView.js';
import { ConsumerHelpView } from './components/ConsumerHelpView.js';
import { StandardsExplorerView } from './components/StandardsExplorerView.js';
import { AdminSuiteView } from './components/AdminSuiteView.js';
import { SavedSourcesView } from './components/SavedSourcesView.js';
import { ClauseModal } from './components/ClauseModal.js';
import { UploadModal } from './components/UploadModal.js';
import { DisclaimerBanner } from './components/DisclaimerBanner.js';
import { AppLanguage, UserPersona, BISStandard, BISClause, ChatMessage } from './types/bis.js';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainNavTab>('home');
  const [language, setLanguage] = useState<AppLanguage>('en');
  const [persona, setPersona] = useState<UserPersona>('manufacturer');
  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Modal states
  const [clauseModalStandard, setClauseModalStandard] = useState<BISStandard | null>(null);
  const [clauseModalSelectedClause, setClauseModalSelectedClause] = useState<BISClause | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string>('');

  // Bookmarks
  const [savedStandards, setSavedStandards] = useState<BISStandard[]>(() => {
    try {
      const stored = localStorage.getItem('bis_saved_standards');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bis_saved_standards', JSON.stringify(savedStandards));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }, [savedStandards]);

  const handleSendMessage = async (query: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          history: messages.slice(-4).map(m => ({ role: m.role, content: m.content })),
          language
        })
      });

      const assistantMsg: ChatMessage = await res.json();
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'I encountered an issue connecting to the BIS Knowledge Base. Please try again.',
        timestamp: new Date().toISOString(),
        evidenceLevel: 'limited'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleSelectPromptFromAnywhere = (promptText: string) => {
    setChatInitialPrompt(promptText);
    setActiveTab('chat');
    handleSendMessage(promptText);
  };

  const handleToggleBookmark = (standard: BISStandard) => {
    setSavedStandards(prev => {
      const exists = prev.some(s => s.id === standard.id);
      if (exists) {
        return prev.filter(s => s.id !== standard.id);
      } else {
        return [...prev, standard];
      }
    });
  };

  const handleOpenClause = (standard: BISStandard, clause?: BISClause | null) => {
    setClauseModalStandard(standard);
    setClauseModalSelectedClause(clause || null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Global Header */}
      <Header
        currentLanguage={language}
        onLanguageChange={setLanguage}
        currentPersona={persona}
        onPersonaChange={setPersona}
        isAdminMode={isAdminMode}
        onToggleAdmin={() => {
          setIsAdminMode(!isAdminMode);
          if (!isAdminMode) setActiveTab('admin-dashboard');
        }}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Navigation Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          language={language}
          persona={persona}
          isAdminMode={isAdminMode}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          savedCount={savedStandards.length}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
          {/* Official Disclaimer Banner at top of workspace */}
          <div className="mb-6">
            <DisclaimerBanner language={language} />
          </div>

          {activeTab === 'home' && (
            <HomeView
              language={language}
              persona={persona}
              onNavigateToTab={setActiveTab}
              onSelectPrompt={handleSelectPromptFromAnywhere}
              onOpenClause={handleOpenClause}
            />
          )}

          {activeTab === 'chat' && (
            <ChatView
              language={language}
              persona={persona}
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isChatLoading}
              onOpenClause={handleOpenClause}
              onOpenUpload={() => setIsUploadModalOpen(true)}
              onResetChat={() => setMessages([])}
              initialPrompt={chatInitialPrompt}
            />
          )}

          {activeTab === 'find-standards' && (
            <FindStandardsView
              language={language}
              onOpenClause={handleOpenClause}
              onAskChat={handleSelectPromptFromAnywhere}
            />
          )}

          {activeTab === 'certification' && (
            <CertificationView
              language={language}
              onAskChat={handleSelectPromptFromAnywhere}
            />
          )}

          {activeTab === 'laboratories' && (
            <LabFinderView
              language={language}
              onAskChat={handleSelectPromptFromAnywhere}
            />
          )}

          {activeTab === 'hallmarking' && (
            <HallmarkingView
              language={language}
              onAskChat={handleSelectPromptFromAnywhere}
            />
          )}

          {activeTab === 'consumer' && (
            <ConsumerHelpView
              language={language}
              onAskChat={handleSelectPromptFromAnywhere}
            />
          )}

          {activeTab === 'standards' && (
            <StandardsExplorerView
              language={language}
              onOpenClause={handleOpenClause}
              onAskChat={handleSelectPromptFromAnywhere}
            />
          )}

          {activeTab === 'saved' && (
            <SavedSourcesView
              savedStandards={savedStandards}
              onRemoveBookmark={(id) => setSavedStandards(prev => prev.filter(s => s.id !== id))}
              onOpenClause={handleOpenClause}
              onAskChat={handleSelectPromptFromAnywhere}
            />
          )}

          {(activeTab === 'admin-dashboard' || activeTab === 'admin-rag' || activeTab === 'admin-kb') && (
            <AdminSuiteView
              language={language}
              activeSubTab={
                activeTab === 'admin-rag' ? 'rag' : activeTab === 'admin-kb' ? 'kb' : 'dashboard'
              }
            />
          )}
        </main>
      </div>

      {/* Global Clause Modal */}
      <ClauseModal
        standard={clauseModalStandard}
        selectedClause={clauseModalSelectedClause}
        onClose={() => {
          setClauseModalStandard(null);
          setClauseModalSelectedClause(null);
        }}
        onSaveBookmark={handleToggleBookmark}
        isBookmarked={clauseModalStandard ? savedStandards.some(s => s.id === clauseModalStandard.id) : false}
      />

      {/* Global Document Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSelectStandard={handleOpenClause}
        onAskChat={handleSelectPromptFromAnywhere}
      />

      {/* Compact footer disclaimer */}
      <DisclaimerBanner language={language} compact={true} />
    </div>
  );
}
