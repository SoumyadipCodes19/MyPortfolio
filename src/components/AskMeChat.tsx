import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX, FiSend, FiCpu, FiDatabase, FiZap } from 'react-icons/fi';
import { askRAG, RAGResponse, RetrievedChunk } from '../utils/rag';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  sources?: RetrievedChunk[];
  mode?: 'gemini' | 'retrieval-only';
  loading?: boolean;
}

const SUGGESTED_QUESTIONS = [
  'What projects has Soumyadip built?',
  'What are his ML skills?',
  'Tell me about his internships',
  'How to contact Soumyadip?',
];

const categoryColor: Record<string, string> = {
  bio: '#00F5FF',
  experience: '#7B2FFF',
  project: '#00FF88',
  skill: '#00F5FF',
  education: '#7B2FFF',
  certification: '#00FF88',
  contact: '#00F5FF',
};

const categoryIcon: Record<string, string> = {
  bio: '👤',
  experience: '💼',
  project: '⚡',
  skill: '🔧',
  education: '🎓',
  certification: '🏆',
  contact: '📬',
};

function SourceBadge({ source }: { source: RetrievedChunk }) {
  const color = categoryColor[source.chunk.category] ?? '#8892B0';
  const icon = categoryIcon[source.chunk.category] ?? '📄';
  return (
    <span
      className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded-full"
      style={{
        background: color + '12',
        color,
        border: `1px solid ${color}25`,
      }}
    >
      <span>{icon}</span>
      {source.chunk.title}
    </span>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      <div className={`max-w-[85%] ${isUser ? '' : ''}`}>
        {!isUser && (
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,245,255,0.15)', border: '1px solid rgba(0,245,255,0.3)' }}>
              <FiCpu className="w-2.5 h-2.5 text-cyan-neon" />
            </div>
            <span className="font-mono text-xs text-text-muted">Soumyadip AI</span>
            {msg.mode === 'gemini' && (
              <span className="font-mono text-xs px-1.5 py-0.5 rounded-full flex items-center gap-1" style={{ background: 'rgba(0,245,255,0.08)', color: '#00F5FF', border: '1px solid rgba(0,245,255,0.2)' }}>
                <FiZap className="w-2.5 h-2.5" /> Gemini
              </span>
            )}
          </div>
        )}

        <div
          className="px-4 py-3 rounded-2xl text-sm leading-relaxed"
          style={
            isUser
              ? { background: 'linear-gradient(135deg, #00F5FF15, #7B2FFF15)', border: '1px solid rgba(0,245,255,0.2)', color: '#CCD6F6' }
              : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#8892B0' }
          }
        >
          {msg.loading ? (
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#00F5FF' }}
                  animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
                  transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                />
              ))}
            </div>
          ) : (
            msg.text
          )}
        </div>

        {/* RAG Sources */}
        {!isUser && msg.sources && msg.sources.length > 0 && !msg.loading && (
          <div className="mt-2">
            <div className="flex items-center gap-1 mb-1.5">
              <FiDatabase className="w-2.5 h-2.5" style={{ color: '#5a6478' }} />
              <span className="font-mono text-xs text-text-muted">retrieved from</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {msg.sources.map((s) => (
                <SourceBadge key={s.chunk.id} source={s} />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

const AskMeChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hi! I'm an AI assistant trained on Soumyadip's portfolio using RAG. Ask me anything about his projects, skills, experience, or how to reach him!",
      mode: 'retrieval-only',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const handleSend = async (query: string) => {
    if (!query.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: query };
    const loadingMsg: Message = { id: Date.now().toString() + 'l', role: 'assistant', text: '', loading: true };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const result: RAGResponse = await askRAG(query);
      setMessages((prev) =>
        prev.map((m) =>
          m.loading ? { ...m, text: result.answer, sources: result.sources, mode: result.mode, loading: false } : m
        )
      );
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.loading ? { ...m, text: "Sorry, something went wrong. Please try again.", loading: false } : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-2xl font-mono text-sm shadow-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(123,47,255,0.15))',
          border: '1px solid rgba(0,245,255,0.3)',
          backdropFilter: 'blur(20px)',
          color: '#00F5FF',
          boxShadow: '0 0 30px rgba(0,245,255,0.15), 0 8px 32px rgba(0,0,0,0.4)',
        }}
        onClick={() => setIsOpen((o) => !o)}
        whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,245,255,0.25), 0 8px 32px rgba(0,0,0,0.4)' }}
        whileTap={{ scale: 0.96 }}
        animate={isOpen ? {} : {
          boxShadow: [
            '0 0 20px rgba(0,245,255,0.15)', 
            '0 0 35px rgba(0,245,255,0.3)', 
            '0 0 20px rgba(0,245,255,0.15)'
          ]
        }}
        transition={{ duration: 2, repeat: isOpen ? 0 : Infinity }}
      >
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          {isOpen ? <FiX className="w-4 h-4" /> : <FiMessageSquare className="w-4 h-4" />}
        </motion.div>
        {!isOpen && <span>Ask Me</span>}
        {!isOpen && (
          <span
            className="text-xs px-1.5 py-0.5 rounded-full"
            style={{ background: 'rgba(0,255,136,0.15)', color: '#00FF88', border: '1px solid rgba(0,255,136,0.25)', fontSize: '9px' }}
          >
            RAG
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-8 z-50 flex flex-col rounded-2xl overflow-hidden"
            style={{
              width: '380px',
              height: '520px',
              background: 'rgba(5, 5, 16, 0.92)',
              border: '1px solid rgba(0,245,255,0.15)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 0 60px rgba(0,245,255,0.08), 0 32px 80px rgba(0,0,0,0.6)',
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,245,255,0.03)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(0,245,255,0.12)', border: '1px solid rgba(0,245,255,0.25)' }}
                >
                  <FiCpu className="w-4 h-4 text-cyan-neon" />
                </div>
                <div>
                  <p className="text-text-primary font-semibold text-sm">Soumyadip AI</p>
                  <p className="font-mono text-xs text-text-muted flex items-center gap-1">
                    <FiDatabase className="w-2.5 h-2.5" /> RAG-powered
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="font-mono text-xs px-2 py-1 rounded-full"
                  style={{ background: 'rgba(0,255,136,0.08)', color: '#00FF88', border: '1px solid rgba(0,255,136,0.2)' }}
                >
                  ● Online
                </span>
              </div>
            </div>

            {/* RAG pipeline indicator */}
            <div
              className="flex items-center gap-3 px-5 py-2 flex-shrink-0"
              style={{ background: 'rgba(0,245,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
            >
              {['Retrieve', '→', 'Augment', '→', 'Generate'].map((step, i) => (
                <span
                  key={i}
                  className="font-mono text-xs"
                  style={{ color: step === '→' ? '#2d3748' : step === 'Retrieve' ? '#00F5FF' : step === 'Augment' ? '#7B2FFF' : '#00FF88' }}
                >
                  {step}
                </span>
              ))}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,245,255,0.1) transparent' }}>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}

              {/* Suggested questions (only at start) */}
              {messages.length === 1 && (
                <motion.div
                  className="mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="font-mono text-xs text-text-muted mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <motion.button
                        key={q}
                        className="font-mono text-xs px-3 py-1.5 rounded-lg text-left"
                        style={{
                          background: 'rgba(0,245,255,0.06)',
                          color: '#8892B0',
                          border: '1px solid rgba(0,245,255,0.12)',
                        }}
                        whileHover={{ background: 'rgba(0,245,255,0.12)', color: '#00F5FF', scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSend(q)}
                      >
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="px-4 py-3 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about Soumyadip..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent font-mono text-sm text-text-primary placeholder-text-muted outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(0,245,255,0.12)',
                    borderRadius: '10px',
                    padding: '8px 14px',
                  }}
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: input.trim() ? 'rgba(0,245,255,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${input.trim() ? 'rgba(0,245,255,0.3)' : 'rgba(255,255,255,0.06)'}`,
                    color: input.trim() ? '#00F5FF' : '#4a5568',
                  }}
                  whileHover={input.trim() ? { scale: 1.08 } : {}}
                  whileTap={input.trim() ? { scale: 0.92 } : {}}
                >
                  <FiSend className="w-3.5 h-3.5" />
                </motion.button>
              </form>
              <p className="font-mono text-xs text-text-muted mt-2 text-center">
                Powered by TF-IDF RAG +{' '}
                <span style={{ color: '#00F5FF' }}>Gemini 1.5 Flash</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AskMeChat;
