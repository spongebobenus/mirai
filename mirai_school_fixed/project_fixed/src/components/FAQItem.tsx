import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`bg-white rounded-[14px] border overflow-hidden transition-all duration-400 ${
        open ? 'border-[var(--accent-soft)] shadow-[var(--shadow)]' : 'border-[var(--border-light)] hover:border-[var(--border-color)]'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-5 flex justify-between items-center gap-5 text-left transition-colors hover:text-[var(--accent)]"
      >
        <span
          className="text-base text-[var(--text-primary)] leading-relaxed transition-inherit"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          {question}
        </span>
        <span
          className={`w-7 h-7 border-[1.5px] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-400 text-base ${
            open
              ? 'bg-[var(--accent)] border-[var(--accent)] text-white rotate-45'
              : 'border-[var(--border-color)] text-[var(--text-muted)] font-light'
          }`}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-500"
        style={{
          maxHeight: open ? '300px' : '0',
        }}
      >
        <div className="px-6 pb-6 text-sm leading-relaxed text-[var(--text-secondary)] font-normal">
          {answer}
        </div>
      </div>
    </div>
  );
}
