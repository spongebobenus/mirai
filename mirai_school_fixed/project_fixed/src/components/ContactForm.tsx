import { useState, type FormEvent, type ChangeEvent } from 'react';

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbz7f-qXLxPoLfJUAESgJamj4NW-XF_sIOPqF4AAr4V9BZyreFvNKVXBs6yu2K-xCjc/exec';

interface ContactFormProps {
  t: {
    formTitle: string;
    nameLabel: string;
    phoneLabel2: string;
    branchLabel: string;
    selectBranch: string;
    messageLabel: string;
    submit: string;
    successTitle: string;
    successText: string;
  };
}

const IconCheck = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12"/>
  </svg>
);

const branches = [
  {
    value: 'Ораза Исаева (1–4 класс)',
    name: 'Ораза Исаева',
    addr: 'ул. Ораза Исаева, 3',
    grades: '1–4 класс',
    tag: 'Начальная школа',
  },
  {
    value: 'Аскарова (1–9 класс)',
    name: 'Аскарова',
    addr: 'ул. Аскарова, 4А',
    grades: '1–9 класс',
    tag: 'Начальная + основная',
  },
];

export default function ContactForm({ t }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    branch: '',
    message: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhoneFocus = () => {
    if (!formData.phone) {
      setFormData((prev) => ({ ...prev, phone: '+7' }));
    }
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    // Ensure +7 is always at the start
    if (!val.startsWith('+7')) {
      val = '+7' + val.replace(/^\+7?/, '').replace(/[^\d]/g, '');
    }
    // Format: +7 (XXX) XXX-XX-XX
    const digits = val.replace(/\D/g, '').substring(1); // remove +7
    let formatted = '+7';
    if (digits.length > 0) {
      formatted += ' (' + digits.substring(0, 3);
    }
    if (digits.length >= 3) {
      formatted += ') ' + digits.substring(3, 6);
    }
    if (digits.length >= 6) {
      formatted += '-' + digits.substring(6, 8);
    }
    if (digits.length >= 8) {
      formatted += '-' + digits.substring(8, 10);
    }
    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          branch: formData.branch,
          message: formData.message,
          source: 'Mirai School — Admission Page',
          createdAt: new Date().toISOString(),
        }),
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      setSubmitted(true);
    } catch (err) {
      console.error('Ошибка отправки формы:', err);
      setError('Не удалось отправить заявку. Попробуйте ещё раз.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16 px-6">
        <div className="w-[60px] h-[60px] border-2 border-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--accent)]">
          <IconCheck />
        </div>
        <h3 className="text-2xl font-light text-white mb-2.5" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          {t.successTitle}
        </h3>
        <p className="text-sm text-white/30">{t.successText}</p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-dark-alt)] border border-white/[0.06] p-11 rounded-[20px] relative transition-all duration-400 hover:border-white/10">
      <div className="absolute top-0 left-10 right-10 h-[3px] bg-[var(--accent)] rounded-b" />
      <h3 className="text-2xl font-light text-white mb-7 tracking-wide" style={{ fontFamily: "'Noto Serif JP', serif" }}>
        {t.formTitle}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-[10px] tracking-[0.15em] uppercase text-white/25 mb-2 font-semibold">
            {t.nameLabel}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[var(--accent)] focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] rounded-[10px]"
          />
        </div>
        <div className="mb-5">
          <label className="block text-[10px] tracking-[0.15em] uppercase text-white/25 mb-2 font-semibold">
            {t.phoneLabel2}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            onFocus={handlePhoneFocus}
            placeholder="+7 (___) ___-__-__"
            required
            className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[var(--accent)] focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] rounded-[10px]"
          />
        </div>
        <div className="mb-5">
          <label className="block text-[10px] tracking-[0.15em] uppercase text-white/25 mb-2 font-semibold">
            {t.branchLabel}
          </label>
          <div className="flex flex-col gap-3">
            {branches.map((b) => {
              const selected = formData.branch === b.value;
              return (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, branch: b.value }))}
                  className={`
                    relative text-left w-full p-4 rounded-[14px] border transition-all duration-300 cursor-pointer
                    ${selected
                      ? 'bg-[rgba(59,130,246,0.12)] border-[var(--accent)] shadow-[0_0_0_3px_rgba(59,130,246,0.12)]'
                      : 'bg-white/[0.04] border-white/[0.08] hover:bg-white/[0.07] hover:border-white/15'
                    }
                  `}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all
                      ${selected ? 'border-[var(--accent)]' : 'border-white/20'}
                    `}>
                      {selected && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-white">
                          {b.name}
                        </span>
                        <span className={`
                          text-[10px] px-2 py-0.5 rounded-full font-semibold tracking-wide
                          ${selected
                            ? 'bg-[var(--accent)]/20 text-[var(--accent-light)]'
                            : 'bg-white/[0.06] text-white/40'
                          }
                        `}>
                          {b.tag}
                        </span>
                      </div>
                      <div className="text-xs text-white/35 mb-0.5">{b.addr}</div>
                      <div className="text-[11px] text-white/25">{b.grades}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <input type="hidden" name="branch" value={formData.branch} required />
        </div>
        <div className="mb-5">
          <label className="block text-[10px] tracking-[0.15em] uppercase text-white/25 mb-2 font-semibold">
            {t.messageLabel}
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white outline-none transition-all focus:border-[var(--accent)] focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] rounded-[10px] resize-y min-h-[90px]"
          />
        </div>

        {error && (
          <div className="mb-5 rounded-[10px] bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-[var(--accent)] text-white border-none py-4 text-xs tracking-[0.15em] uppercase font-semibold cursor-pointer transition-all rounded-[10px] shadow-[0_4px_14px_rgba(59,130,246,0.22)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(59,130,246,0.32)] hover:bg-[var(--accent-light)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {submitting ? 'Отправка...' : t.submit}
        </button>
      </form>
    </div>
  );
}
