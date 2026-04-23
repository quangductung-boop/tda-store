import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { content } from '../../config/content';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-padding" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="section-container" style={{ maxWidth: '800px' }}>
        <h2 className="section-title">{content.faq.title}</h2>
        <p className="section-subtitle">{content.faq.subtitle}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {content.faq.items.map((item, i) => (
            <div
              key={i}
              style={{
                borderRadius: '14px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-card)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                borderColor: openIndex === i ? 'rgba(0, 229, 255, 0.3)' : 'var(--color-border)',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'transparent',
                  border: 'none',
                  color: openIndex === i ? 'var(--color-primary)' : 'var(--color-text-primary)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'var(--font-body)',
                  transition: 'color 0.3s',
                }}
              >
                {item.question}
                <ChevronDown
                  size={18}
                  style={{
                    transition: 'transform 0.3s',
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0)',
                    flexShrink: 0,
                    marginLeft: '12px',
                  }}
                />
              </button>

              <div style={{
                maxHeight: openIndex === i ? '200px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease',
              }}>
                <p style={{
                  padding: '0 20px 18px',
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                }}>
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
