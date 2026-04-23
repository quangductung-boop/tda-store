import { content } from '../../config/content';

export default function BenefitsSection() {
  return (
    <section className="section-padding" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="section-container">
        <h2 className="section-title">{content.benefits.title}</h2>
        <p className="section-subtitle">{content.benefits.subtitle}</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {content.benefits.items.map((item, i) => (
            <div
              key={i}
              className="animate-fade-in"
              style={{
                animationDelay: `${i * 100}ms`,
                opacity: 0,
                padding: '32px 24px',
                borderRadius: '18px',
                background: 'linear-gradient(145deg, rgba(26,31,46,0.8), rgba(15,20,35,0.9))',
                border: '1px solid var(--color-border)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.3)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                fontSize: '2.5rem',
                marginBottom: '16px',
                filter: 'drop-shadow(0 0 8px rgba(0, 229, 255, 0.3))',
              }}>
                {item.icon}
              </div>
              <h3 style={{
                fontWeight: 700,
                fontSize: '1.1rem',
                marginBottom: '8px',
                color: 'var(--color-text-primary)',
              }}>
                {item.title}
              </h3>
              <p style={{
                color: 'var(--color-text-secondary)',
                fontSize: '0.875rem',
                lineHeight: 1.7,
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
