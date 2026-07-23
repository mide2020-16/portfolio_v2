"use client";

import { useState, useEffect } from "react";
import { codePanelSnippet } from "@/lib/data/portfolio";

export function CodePanel() {
  const { filename, secondTab, language, lines } = codePanelSnippet;
  const [cursorVisible, setCursorVisible] = useState(true);

  // blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-[420px] border-2 border-border bg-[#0d0d0d] shadow-[8px_8px_0px_0px_var(--primary-accent)] overflow-hidden font-mono text-[12.5px] select-none">

      {/* ── Title bar ─────────────────────────────────── */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1a1a1a] border-b border-[#2a2a2a]">
        {/* Traffic lights */}
        <div className="flex gap-1.5 mr-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#d4a024]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]" />
        </div>
        <span className="text-[10px] text-[#555] uppercase tracking-widest font-bold mx-auto">
          code editor
        </span>
      </div>

      {/* ── Tab bar ───────────────────────────────────── */}
      <div className="flex border-b border-[#2a2a2a] bg-[#141414]">
        {/* Active tab */}
        <div className="flex items-center gap-2 px-4 py-2 border-r border-[#2a2a2a] bg-[#0d0d0d] border-t-2 border-t-primary-accent">
          <span className="text-[10px] text-[#5c6dff]">TS</span>
          <span className="text-[11px] text-[#e0e0e0] font-medium">{filename}</span>
          <span className="text-[#444] text-[10px] ml-1 hover:text-[#888] cursor-pointer">×</span>
        </div>
        {/* Inactive tab */}
        <div className="flex items-center gap-2 px-4 py-2 border-r border-[#2a2a2a]">
          <span className="text-[10px] text-[#444]">TS</span>
          <span className="text-[11px] text-[#555]">{secondTab}</span>
        </div>
        <div className="flex items-center px-3 text-[#444] text-[11px] hover:text-[#888] cursor-pointer">+</div>
      </div>

      {/* ── Editor body ───────────────────────────────── */}
      <div className="flex overflow-x-auto">
        {/* Line numbers gutter */}
        <div className="flex-shrink-0 py-4 px-3 text-right text-[#3a3a3a] leading-7 bg-[#0d0d0d] border-r border-[#1e1e1e] min-w-[40px]">
          {lines.map((_, i) => (
            <div key={i} className={i === lines.length - 1 ? "text-[#5c6dff]" : ""}>
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code area */}
        <div className="py-4 px-5 leading-7 flex-1 overflow-x-auto">
          {lines.map((tokens, lineIdx) => (
            <div key={lineIdx} className="whitespace-pre">
              {tokens.length === 0 ? (
                <span>&nbsp;</span>
              ) : (
                tokens.map((token, tIdx) => (
                  <span key={tIdx} style={{ color: token.color }}>
                    {token.text}
                  </span>
                ))
              )}
              {/* blinking cursor on last line */}
              {lineIdx === lines.length - 1 && (
                <span
                  className="inline-block w-[2px] h-[14px] align-middle ml-0.5 bg-[#5c6dff]"
                  style={{ opacity: cursorVisible ? 1 : 0, transition: "opacity 0.1s" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Status bar ────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#5c6dff] text-white text-[10px] font-bold tracking-wide">
        <div className="flex items-center gap-3">
          <span>⎇ main</span>
          <span className="opacity-70">|</span>
          <span>Ln {lines.length}, Col 2</span>
        </div>
        <div className="flex items-center gap-3">
          <span>UTF-8</span>
          <span className="opacity-70">|</span>
          <span>{language}</span>
        </div>
      </div>
    </div>
  );
}
