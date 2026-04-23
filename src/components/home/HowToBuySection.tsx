import { content } from '../../config/content';

export default function HowToBuySection() {
  return (
    <section className="section-padding" style={{ background: 'var(--color-bg-secondary)' }}>
      <div className="section-container">
        <h2 className="section-title">{content.howToBuy.title}</h2>
        <p className="section-subtitle">{content.howToBuy.subtitle}</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          maxWidth: '900px',
          margin: '0 auto',
        }}>
          {content.howToBuy.steps.map((step, i) => (
            <div
              key={i}
              className="animate-fade-in"
              style={{
                animationDelay: `${i * 150}ms`,
                opacity: 0,
                position: 'relative',
                padding: '36px 24px',
                borderRadius: '18px',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                textAlign: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 229, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Step number */}
              <div style={{
                position: 'absolute',
                top: '-14px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00e5ff, #0091ea)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 800,
                color: '#0a0e17',
              }}>
                {i + 1}
              </div>

              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{step.icon}</div>
              <h3 style={{
                fontWeight: 700,
                fontSize: '1.05rem',
                marginBottom: '8px',
                color: 'var(--color-text-primary)',
              }}>
                {step.title}
              </h3>
              <p style={{
                color: 'var(--color-text-secondary)',
                fontSize: '0.875rem',
                lineHeight: 1.6,
              }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
