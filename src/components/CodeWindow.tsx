import React from 'react';
import { motion } from 'framer-motion';

interface CodeLine {
  type: 'comment' | 'keyword' | 'string' | 'property' | 'value' | 'bracket' | 'operator' | 'blank';
  content: string;
  indent?: number;
}

const codeLines: CodeLine[] = [
  { type: 'comment', content: '# soumyadip_ghosh.py' },
  { type: 'blank', content: '' },
  { type: 'keyword', content: 'class ', indent: 0 },
  { type: 'bracket', content: '{' },
  { type: 'blank', content: '' },
  { type: 'property', content: '  name', indent: 2 },
  { type: 'string', content: '"Soumyadip Ghosh"' },
  { type: 'property', content: '  role', indent: 2 },
  { type: 'string', content: '"CS Engineer @ VIT"' },
  { type: 'blank', content: '' },
  { type: 'property', content: '  languages', indent: 2 },
  { type: 'value', content: '["Python", "C++", "Java", "JS"]' },
  { type: 'property', content: '  ml_stack', indent: 2 },
  { type: 'value', content: '["TensorFlow", "RAG", "LangChain"]' },
  { type: 'property', content: '  cgpa', indent: 2 },
  { type: 'value', content: '8.36' },
  { type: 'blank', content: '' },
  { type: 'property', content: '  open_to_work', indent: 2 },
  { type: 'keyword', content: 'True' },
  { type: 'bracket', content: '}' },
];

const EditorLine: React.FC<{ line: CodeLine; index: number }> = ({ line, index }) => {
  const colorMap: Record<CodeLine['type'], string> = {
    comment: '#6A9955',
    keyword: '#569CD6',
    string: '#CE9178',
    property: '#9CDCFE',
    value: '#4EC9B0',
    bracket: '#DA70D6',
    operator: '#D4D4D4',
    blank: 'transparent',
  };

  const renderLine = () => {
    if (line.type === 'blank') return <span>&nbsp;</span>;
    if (line.type === 'keyword' && line.content === 'class ') {
      return (
        <span>
          <span style={{ color: '#569CD6' }}>class </span>
          <span style={{ color: '#4EC9B0' }}>Developer</span>
          <span style={{ color: '#D4D4D4' }}>:</span>
        </span>
      );
    }
    if (line.type === 'bracket' && line.content === '}') {
      return null; // skip, handled above
    }
    if (line.type === 'property') {
      return (
        <span>
          <span style={{ color: '#9CDCFE' }}>{line.content}</span>
          <span style={{ color: '#D4D4D4' }}> = </span>
        </span>
      );
    }
    return <span style={{ color: colorMap[line.type] }}>{line.content}</span>;
  };

  // Skip the closing bracket
  if (line.type === 'bracket' && line.content === '}') return null;

  return (
    <motion.div
      className="flex items-start"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 + index * 0.06, duration: 0.3 }}
    >
      <span
        className="select-none mr-4 text-right font-mono text-xs flex-shrink-0"
        style={{ color: '#4a5568', minWidth: '1.5rem' }}
      >
        {index + 1}
      </span>
      <span className="font-mono text-xs" style={{ paddingLeft: `${(line.indent ?? 0) * 0}px` }}>
        {renderLine()}
      </span>
    </motion.div>
  );
};

const CodeWindow: React.FC = () => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Glow behind window */}
      <div
        className="absolute -inset-4 rounded-2xl"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,245,255,0.08) 0%, rgba(123,47,255,0.06) 50%, transparent 70%)',
          filter: 'blur(20px)',
          zIndex: -1,
        }}
      />

      {/* Window frame */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: '#0D1117',
          border: '1px solid rgba(0,245,255,0.15)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(0,245,255,0.05)',
          minWidth: '340px',
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: '#161B22',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F56' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#27C93F' }} />
          </div>
          <span className="font-mono text-xs" style={{ color: '#6A737D' }}>
            soumyadip_ghosh.py
          </span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-neon animate-pulse" />
            <span className="font-mono text-xs text-emerald-neon">Python</span>
          </div>
        </div>

        {/* Code area */}
        <div className="p-4 space-y-0.5" style={{ background: '#0D1117' }}>
          {codeLines.map((line, i) => (
            <EditorLine key={i} line={line} index={i} />
          ))}

          {/* Blinking cursor at end */}
          <motion.div
            className="flex items-start"
          >
            <span className="select-none mr-4 font-mono text-xs" style={{ color: '#4a5568', minWidth: '1.5rem' }}>
              {codeLines.length + 1}
            </span>
            <motion.span
              className="font-mono text-xs inline-block w-1.5 h-4 ml-0.5"
              style={{ background: '#00F5FF' }}
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'steps(1)' }}
            />
          </motion.div>
        </div>

        {/* Status bar */}
        <div
          className="flex items-center justify-between px-4 py-1.5"
          style={{
            background: '#0D2137',
            borderTop: '1px solid rgba(0,245,255,0.1)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs" style={{ color: '#00F5FF' }}>
              ⎇ main
            </span>
            <span className="font-mono text-xs" style={{ color: '#6A737D' }}>
              Ln {codeLines.length}, Col 1
            </span>
          </div>
          <span className="font-mono text-xs" style={{ color: '#6A737D' }}>
            UTF-8
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeWindow;
