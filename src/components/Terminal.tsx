import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const commands = [
  "> sys_init.sh",
  "[OK] Initializing neural subnets...",
  "[OK] Loading security protocols...",
  "[OK] Connecting to mainframes...",
  "> Awaiting command"
];

export function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= commands.length) return;

    const currentString = commands[currentLineIndex];

    if (currentCharIndex < currentString.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, Math.random() * 50 + 20);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, currentString]);
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  const currentTypingLine = commands[currentLineIndex] ? commands[currentLineIndex].substring(0, currentCharIndex) : '';

  return (
    <div className="bg-black border border-brand-blue/30 rounded-xl overflow-hidden flex flex-col h-full shadow-[0_0_15px_rgba(0,224,255,0.2)] relative group">
      {/* Absolute glow on hover for terminal */}
      <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="h-8 bg-[#0a0a0c] border-b border-brand-blue/20 flex items-center px-4 space-x-2">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
        <span className="terminal-text text-[10px] opacity-50 ml-4">sys_init.sh</span>
      </div>
      <div className="p-4 terminal-text flex-grow flex flex-col justify-end min-h-[200px] text-xs sm:text-sm">
        {lines.map((line, i) => {
          const isLastLine = i === lines.length - 1 && currentLineIndex === commands.length;
          return (
            <div key={i} className={line.startsWith('>') ? 'text-gray-300' : 'text-gray-500'}>
              {line.startsWith('[OK]') ? <span className="text-emerald-500">[OK]</span> : null}
              {line.startsWith('[OK]') ? line.substring(4) : line}
              {isLastLine && <span className="animate-cursor-blink text-brand-blue ml-1">_</span>}
            </div>
          );
        })}
        {currentLineIndex < commands.length && (
          <div className="text-brand-blue">
             {currentTypingLine.startsWith('[OK]') ? <span className="text-emerald-500">[OK]</span> : null}
             {currentTypingLine.startsWith('[OK]') ? currentTypingLine.substring(4) : currentTypingLine}
             <span className="animate-cursor-blink text-brand-blue ml-1">_</span>
          </div>
        )}
      </div>
    </div>
  );
}
