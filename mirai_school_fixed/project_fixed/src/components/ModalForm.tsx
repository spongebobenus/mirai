import { useState, type FormEvent, type ChangeEvent } from 'react';

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbz7f-qXLxPoLfJUAESgJamj4NW-XF_sIOPqF4AAr4V9BZyreFvNKVXBs6yu2K-xCjc/exec';

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  t: {
    modal: { title: string; subtitle: string; submit: string };
    contact: {
      nameLabel: string;
      phoneLabel2: string;
      branchLabel: string;
      selectBranch: string;
      messageLabel: string;
      successTitle: string;
      successText: string;
    };
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

export default function ModalForm({ isOpen, onClose, t }: ModalFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
    if (!val.startsWith('+7')) {
      val = '+7' + val.replace(/^\+7?/, '').replace(/[^\d]/g, '');
    }
    const digits = val.replace(/\D/g, '').substring(1);
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

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      branch: '',
      message: '',
    });
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
          source: 'Mirai School — Modal (Записаться на встречу)',
          createdAt: new Date().toISOString(),
        }),
      });

      const text = await response.text();

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${text}`);
      }

      setSubmitted(true);
      resetForm();

      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2500);
    } catch (err) {
      console.error('Ошибка отправки формы:', err);
      setError('Не удалось отправить заявку. Попробуйте ещё раз.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(15,42,77,0.75)] backdrop-blur-[16px] z-[300] flex items-center justify-center opacity-100 transition-opacity duration-400 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 md:p-12 max-w-[520px] w-full relative max-h-[90vh] overflow-y-auto rounded-[24px] shadow-[0_24px_80px_rgba(15,42,77,0.22)] border border-[var(--border-light)] transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 bg-[var(--border-light)] border-none cursor-pointer text-base text-[var(--text-muted)] transition-all w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--torii-red-pale)] hover:text-[var(--torii-red)]"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-12 px-6">
            <div className="w-[60px] h-[60px] border-2 border-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--accent)]">
              <IconCheck />
            </div>
            <h3 className="text-2xl font-light text-[var(--text-primary)] mb-2.5" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              {t.contact.successTitle}
            </h3>
            <p className="text-sm text-[var(--text-muted)]">{t.contact.successText}</p>
          </div>
        ) : (
          <>
            <h3
              className="text-[28px] md:text-[30px] font-light text-[var(--text-primary)] mb-2 leading-tight"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              {t.modal.title}
            </h3>

            <p className="text-sm md:text-[15px] text-[var(--text-secondary)] mb-7 leading-relaxed">
              {t.modal.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Имя */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2 font-semibold">
                  {t.contact.nameLabel}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[var(--bg-warm)] border-[1.5px] border-[var(--border-color)] px-4 py-3.5 text-sm text-[var(--text-primary)] outline-none transition-all rounded-[14px] focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_var(--accent-pale)]"
                />
              </div>

              {/* Телефон */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2 font-semibold">
                  {t.contact.phoneLabel2}
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onFocus={handlePhoneFocus}
                  placeholder="+7 (___) ___-__-__"
                  required
                  className="w-full bg-[var(--bg-warm)] border-[1.5px] border-[var(--border-color)] px-4 py-3.5 text-sm text-[var(--text-primary)] outline-none transition-all rounded-[14px] focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_var(--accent-pale)]"
                />
              </div>

              {/* Филиал — кастомные карточки */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2 font-semibold">
                  {t.contact.branchLabel}
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
                            ? 'bg-[rgba(59,130,246,0.08)] border-[var(--accent)] shadow-[0_0_0_4px_var(--accent-pale)]'
                            : 'bg-[var(--bg-warm)] border-[var(--border-color)] hover:border-[var(--accent-soft)] hover:bg-white'
                          }
                        `}
                      >
                        <div className="flex items-start gap-3.5">
                          <div className={`
                            w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all
                            ${selected ? 'border-[var(--accent)]' : 'border-[var(--border-color)]'}
                          `}>
                            {selected && (
                              <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-[var(--text-primary)]">
                                {b.name}
                              </span>
                              <span className={`
                                text-[10px] px-2 py-0.5 rounded-full font-semibold tracking-wide
                                ${selected
                                  ? 'bg-[var(--accent-pale)] text-[var(--accent)]'
                                  : 'bg-[var(--bg-warm)] text-[var(--text-muted)]'
                                }
                              `}>
                                {b.tag}
                              </span>
                            </div>
                            <div className="text-xs text-[var(--text-muted)] mb-0.5">{b.addr}</div>
                            <div className="text-[11px] text-[var(--text-secondary)]">{b.grades}</div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" name="branch" value={formData.branch} required />
              </div>

              {/* Сообщение */}
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-2 font-semibold">
                  {t.contact.messageLabel}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-[var(--bg-warm)] border-[1.5px] border-[var(--border-color)] px-4 py-3.5 text-sm text-[var(--text-primary)] outline-none transition-all rounded-[14px] focus:border-[var(--accent)] focus:shadow-[0_0_0_4px_var(--accent-pale)] resize-y min-h-[90px]"
                />
              </div>

              {/* Ошибка */}
              {error && (
                <div className="rounded-[14px] bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[var(--accent)] text-white border-none py-4 text-xs tracking-[0.15em] uppercase font-semibold cursor-pointer transition-all mt-2 rounded-[14px] shadow-[0_8px_24px_rgba(59,130,246,0.28)] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(59,130,246,0.35)] hover:bg-[var(--accent-light)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {submitting ? 'Отправка...' : t.modal.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
