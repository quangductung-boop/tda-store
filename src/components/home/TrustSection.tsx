import { Star } from 'lucide-react';
import { content } from '../../config/content';

export default function TrustSection() {
  return (
    <section className="section-padding" style={{
      background: 'linear-gradient(180deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%)',
    }}>
      <div className="section-container">
        <h2 className="section-title">{content.trust.title}</h2>
        <p className="section-subtitle">{content.trust.subtitle}</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {content.trust.testimonials.map((t, i) => (
            <div
              key={i}
              className="animate-fade-in"
              style={{
                animationDelay: `${i * 100}ms`,
                opacity: 0,
                padding: '28px',
                borderRadius: '18px',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(124, 77, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={16} fill="#ffc107" color="#ffc107" />
                ))}
              </div>

              {/* Content */}
              <p style={{
                color: 'var(--color-text-secondary)',
                fontSize: '0.9rem',
                lineHeight: 1.7,
                marginBottom: '20px',
                fontStyle: 'italic',
              }}>
                "{t.content}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(124, 77, 255, 0.1))',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>
                    {t.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Khách hàng
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
