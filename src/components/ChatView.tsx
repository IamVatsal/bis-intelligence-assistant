import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  ShieldCheck,
  FileText,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Paperclip,
  Mic,
  MicOff,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronRight,
  BookOpen,
  FlaskConical,
  Download,
  Share2
} from 'lucide-react';
import { ChatMessage, BISStandard, BISCitation, AppLanguage, UserPersona, EvidenceLevel } from '../types/bis.js';
import { TRANSLATIONS } from '../data/translations.js';

interface ChatViewProps {
  language: AppLanguage;
  persona: UserPersona;
  messages: ChatMessage[];
  onSendMessage: (query: string) => Promise<void>;
  isLoading: boolean;
  onOpenClause: (standard: BISStandard) => void;
  onOpenUpload: () => void;
  onResetChat: () => void;
  initialPrompt?: string;
}

export const ChatView: React.FC<ChatViewProps> = ({
  language,
  persona,
  messages,
  onSendMessage,
  isLoading,
  onOpenClause,
  onOpenUpload,
  onResetChat,
  initialPrompt
}) => {
  const t = TRANSLATIONS[language];
  const [input, setInput] = useState(initialPrompt || '');
  const [isRecording, setIsRecording] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<Record<string, boolean>>({});
  const [feedbackModalMsgId, setFeedbackModalMsgId] = useState<string | null>(null);
  const [feedbackCategory, setFeedbackCategory] = useState<'incorrect_info' | 'wrong_standard' | 'missing_source' | 'outdated_info' | 'poor_explanation' | 'wrong_language' | 'other'>('incorrect_info');
  const [feedbackComment, setFeedbackComment] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechRecognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt && initialPrompt !== input) {
      setInput(initialPrompt);
    }
  }, [initialPrompt]);

  // Voice speech-to-text setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'gu' ? 'gu-IN' : 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      speechRecognitionRef.current = recognition;
    }
  }, [language]);

  const toggleVoiceRecording = () => {
    if (!speechRecognitionRef.current) {
      alert('Speech Recognition is not supported by your browser.');
      return;
    }

    if (isRecording) {
      speechRecognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      speechRecognitionRef.current.start();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const query = input;
    setInput('');
    await onSendMessage(query);
  };

  const handleFeedbackSubmit = async (messageId: string, isHelpful: boolean) => {
    if (!isHelpful) {
      setFeedbackModalMsgId(messageId);
      return;
    }

    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageId, isHelpful: true })
      });
      setFeedbackSubmitted(prev => ({ ...prev, [messageId]: true }));
    } catch (e) {
      console.error('Feedback submission failed:', e);
    }
  };

  const submitNegativeFeedback = async () => {
    if (!feedbackModalMsgId) return;
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId: feedbackModalMsgId,
          isHelpful: false,
          category: feedbackCategory,
          comment: feedbackComment
        })
      });
      setFeedbackSubmitted(prev => ({ ...prev, [feedbackModalMsgId]: true }));
      setFeedbackModalMsgId(null);
      setFeedbackComment('');
    } catch (e) {
      console.error('Feedback submission failed:', e);
    }
  };

  const renderEvidenceBadge = (level?: EvidenceLevel, rationale?: string) => {
    if (!level) return null;

    const config = {
      high: {
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        dot: 'bg-emerald-500',
        label: 'Evidence: High (Authoritative BIS Data)'
      },
      moderate: {
        bg: 'bg-amber-50 text-amber-900 border-amber-200',
        dot: 'bg-amber-500',
        label: 'Evidence: Moderate (Inferred Scope)'
      },
      limited: {
        bg: 'bg-slate-100 text-slate-700 border-slate-200',
        dot: 'bg-slate-400',
        label: 'Evidence: Limited (Needs Verification)'
      }
    }[level];

    return (
      <div className="flex items-center gap-2 flex-wrap">
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${config.bg}`}>
          <span className={`w-2 h-2 rounded-full ${config.dot}`}></span>
          <span>{config.label}</span>
        </div>
        {rationale && (
          <span className="text-[11px] text-slate-500 italic max-w-xl truncate">
            {rationale}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Chat Sub-header */}
      <div className="px-6 py-3.5 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 font-sans">
                BIS Conversational Intelligence
              </h2>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                RAG Grounded
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Indian Standards, QCOs, Schemes, Laboratories & Hallmarking
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenUpload}
            className="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors"
          >
            <Paperclip className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Upload Specs</span>
          </button>
          <button
            onClick={onResetChat}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors"
            title="Start new conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Message History Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/40">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto p-6 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center shadow-xs">
              <Sparkles className="w-7 h-7 text-amber-500" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                How can I assist your compliance today?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Ask any question regarding product standards, mandatory Quality Control Orders (QCOs), testing requirements, laboratory accreditation, or hallmarking.
              </p>
            </div>
            <div className="w-full space-y-2 pt-2">
              <button
                onClick={() => onSendMessage('What BIS standard applies to electric water heaters?')}
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-blue-50/60 border border-slate-200 text-xs font-medium text-slate-700 hover:text-blue-900 transition-all flex items-center justify-between"
              >
                <span>⚡ Standard for Electric Water Heaters (IS 302-2-21)</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => onSendMessage('I manufacture stainless steel vacuum bottles. What BIS requirements apply?')}
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-blue-50/60 border border-slate-200 text-xs font-medium text-slate-700 hover:text-blue-900 transition-all flex items-center justify-between"
              >
                <span>🍶 Stainless Steel Vacuum Bottles (IS 17526)</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
              <button
                onClick={() => onSendMessage('How can I verify whether a gold jewellery item has genuine hallmarking?')}
                className="w-full text-left p-3 rounded-xl bg-white hover:bg-blue-50/60 border border-slate-200 text-xs font-medium text-slate-700 hover:text-blue-900 transition-all flex items-center justify-between"
              >
                <span>💍 How to verify 6-digit HUID Hallmarks</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-2`}
            >
              {/* Role badge */}
              <div className="flex items-center gap-2 px-1 text-[11px] font-semibold text-slate-400">
                {msg.role === 'user' ? (
                  <span>You</span>
                ) : (
                  <span className="flex items-center gap-1.5 text-blue-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    BIS Intelligence Assistant
                  </span>
                )}
                <span>•</span>
                <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>

              {/* Message Bubble Container */}
              <div
                className={`max-w-3xl rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-br-xs'
                    : 'bg-white border border-slate-200 text-slate-900 rounded-bl-xs'
                }`}
              >
                {/* Assistant Metadata Badges */}
                {msg.role === 'assistant' && (
                  <div className="space-y-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      {msg.intent && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
                          Intent: {msg.intent}
                        </span>
                      )}
                      {renderEvidenceBadge(msg.evidenceLevel, msg.evidenceRationale)}
                    </div>
                  </div>
                )}

                {/* Main Content Markdown representation */}
                <div className="prose prose-sm max-w-none text-slate-800 space-y-3 font-sans">
                  {msg.content.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3 key={pIdx} className="text-base font-bold text-slate-900 mt-4 mb-2">
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('#### ')) {
                      return (
                        <h4 key={pIdx} className="text-sm font-bold text-slate-800 mt-3 mb-1">
                          {paragraph.replace('#### ', '')}
                        </h4>
                      );
                    }
                    if (paragraph.startsWith('* ') || paragraph.startsWith('- ')) {
                      return (
                        <ul key={pIdx} className="list-disc list-inside space-y-1 text-slate-700 text-xs sm:text-sm pl-1">
                          {paragraph.split('\n').map((li, lIdx) => (
                            <li key={lIdx}>{li.replace(/^[*|-]\s*/, '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={pIdx} className="text-xs sm:text-sm leading-relaxed text-slate-700">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Applicable Standards Cards */}
                {msg.applicableStandards && msg.applicableStandards.length > 0 && (
                  <div className="pt-2 space-y-2.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                      Applicable Indian Standards ({msg.applicableStandards.length})
                    </div>
                    <div className="grid grid-cols-1 gap-2.5">
                      {msg.applicableStandards.map((std) => (
                        <div
                          key={std.id}
                          className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors space-y-2"
                        >
                          <div className="flex items-start justify-between flex-wrap gap-2">
                            <div>
                              <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded">
                                {std.standardNumber}
                              </span>
                              <h5 className="font-bold text-xs sm:text-sm text-slate-900 mt-1">
                                {std.title}
                              </h5>
                            </div>
                            {std.isMandatoryQCO ? (
                              <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-100 text-amber-900 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3 text-amber-700" />
                                Mandatory QCO
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-emerald-100 text-emerald-800">
                                Voluntary
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2">
                            {std.scope}
                          </p>
                          <div className="flex items-center justify-between pt-1 border-t border-slate-200/60 text-xs">
                            <span className="text-slate-500 font-medium">Scheme: {std.scheme}</span>
                            <button
                              onClick={() => onOpenClause(std)}
                              className="px-2.5 py-1 bg-white border border-slate-300 hover:border-blue-500 text-blue-700 font-semibold rounded-lg text-xs flex items-center gap-1 transition-colors"
                            >
                              <span>Inspect Clauses & SIT</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step-by-Step Certification Roadmap */}
                {msg.certificationProcess && msg.certificationProcess.length > 0 && (
                  <div className="pt-2 space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      Certification Procedure Roadmap
                    </div>
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
                      {msg.certificationProcess.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Authoritative Citations per Section 14 */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="pt-2 space-y-2 border-t border-slate-100">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                      Sources & Referenced Clauses ({msg.citations.length})
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.citations.map((cite, cIdx) => (
                        <a
                          key={cIdx}
                          href={cite.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50/50 hover:border-blue-300 transition-colors text-xs text-slate-700 block group"
                        >
                          <div className="font-semibold text-blue-800 flex items-center justify-between">
                            <span className="truncate">{cite.standardNumber || cite.title}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                          </div>
                          {cite.clause && (
                            <div className="text-[11px] font-mono text-slate-500">
                              {cite.clause} {cite.page ? `• Page ${cite.page}` : ''}
                            </div>
                          )}
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                            {cite.excerpt}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Assistant Message Actions & Feedback (Section 26) */}
                {msg.role === 'assistant' && (
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-400">
                    <span className="text-[11px]">
                      Validated against BIS Manakonline Repository
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px]">Was this helpful?</span>
                      <button
                        onClick={() => handleFeedbackSubmit(msg.id, true)}
                        className={`p-1 rounded hover:bg-slate-100 ${
                          feedbackSubmitted[msg.id] ? 'text-emerald-600 font-bold' : 'text-slate-400 hover:text-slate-700'
                        }`}
                        title="Helpful"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleFeedbackSubmit(msg.id, false)}
                        className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                        title="Not helpful / Report issue"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Follow-up question chips (Section 22) */}
              {msg.followUpSuggestions && msg.followUpSuggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 max-w-2xl pt-1">
                  {msg.followUpSuggestions.map((suggestion, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => onSendMessage(suggestion)}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-900 transition-all text-left shadow-xs"
                    >
                      {suggestion} →
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))
        )}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs animate-pulse">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-2 shadow-xs">
              <div className="flex items-center gap-2 font-semibold text-blue-700">
                <Sparkles className="w-4 h-4 animate-spin text-amber-500" />
                <span>Retrieving & Grounding against BIS Standards Repository...</span>
              </div>
              <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-blue-600 rounded-full animate-progress"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Formulation Bar */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          {/* Document upload trigger */}
          <button
            type="button"
            onClick={onOpenUpload}
            className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
            title="Upload specification document or test report"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          {/* Voice Input Trigger */}
          <button
            type="button"
            onClick={toggleVoiceRecording}
            className={`p-2.5 rounded-xl transition-colors shrink-0 ${
              isRecording
                ? 'bg-rose-100 text-rose-600 animate-pulse'
                : 'text-slate-500 hover:text-blue-600 hover:bg-slate-100'
            }`}
            title={isRecording ? 'Listening... click to stop' : 'Voice input'}
          >
            {isRecording ? <MicOff className="w-5 h-5 text-rose-600" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.sendPlaceholder}
            className="flex-1 bg-slate-50 border border-slate-200 focus:border-blue-600 focus:bg-white rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-all"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-semibold transition-transform active:scale-95 shrink-0 shadow-sm cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Feedback Dialog Modal */}
      {feedbackModalMsgId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl border border-slate-200 space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">
              Provide Response Feedback
            </h4>
            <p className="text-xs text-slate-500">
              Help us refine the BIS retrieval and citation engine by letting us know what was lacking.
            </p>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Issue Category:</label>
              <select
                value={feedbackCategory}
                onChange={(e) => setFeedbackCategory(e.target.value as any)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800"
              >
                <option value="incorrect_info">Incorrect Technical Information</option>
                <option value="wrong_standard">Wrong Standard Recommended</option>
                <option value="missing_source">Missing or Broken Citation</option>
                <option value="outdated_info">Outdated Standard Version</option>
                <option value="poor_explanation">Poor Explanation / Vague</option>
                <option value="wrong_language">Incorrect Language Translation</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Optional Notes:</label>
              <textarea
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                placeholder="Details on what was missing or incorrect..."
                rows={3}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setFeedbackModalMsgId(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={submitNegativeFeedback}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700"
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
