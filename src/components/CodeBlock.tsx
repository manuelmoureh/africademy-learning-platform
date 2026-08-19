import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  label?: string;
  colorClass?: string;
}

// Shared dark code panel used everywhere a lesson shows real code/prompt text (Worked
// Example, Faded Practice). One copy button implementation instead of four duplicated
// <pre> blocks, so a learner can actually paste this into their own editor.
export const CodeBlock: React.FC<CodeBlockProps> = ({ code, label, colorClass = 'text-amber-300' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    let succeeded = true;
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Clipboard API can be denied (non-HTTPS, permissions policy, older browsers) -
      // fall back to the legacy selection-based copy instead of leaving it broken.
      try {
        const textarea = document.createElement('textarea');
        textarea.value = code;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        succeeded = false;
      }
    }
    if (succeeded) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#12102A]/40 font-mono">
            {label}
          </p>
        </div>
      )}
      <div className="relative group">
        <button
          onClick={handleCopy}
          className={`absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold font-mono transition-all cursor-pointer ${
            copied
              ? 'bg-[#10B981]/20 text-[#10B981]'
              : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
          }`}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <div className="p-4 pr-16 bg-[#12102A] text-white rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
          <pre className={`whitespace-pre-wrap ${colorClass}`}>{code}</pre>
        </div>
      </div>
    </div>
  );
};
