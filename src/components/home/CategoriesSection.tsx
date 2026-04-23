import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { categories } from '../../data/categories';
import { content } from '../../config/content';

export default function CategoriesSection() {
  return (
    <section className="section-container" style={{ padding: '60px 20px', position: 'relative' }}>
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(0, 229, 255, 0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '48px',
        position: 'relative',
        zIndex: 1,
      }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 2.5rem)',
          fontWeight: 800,
          marginBottom: '16px',
        }}>
          <span className="gradient-text">Danh mục sản phẩm</span>
        </h2>
        <p style={{
          color: 'var(--color-text-secondary)',
          fontSize: '1rem',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          Khám phá kho nội dung chất lượng cao
        </p>
        <div style={{
          width: '60px',
          height: '4px',
          background: 'linear-gradient(90deg, transparent, var(--color-primary), transparent)',
          margin: '24px auto 0',
          borderRadius: '2px',
          boxShadow: '0 0 10px var(--color-primary)',
        }} />
      </div>

      {/* Categories Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        position: 'relative',
        zIndex: 1,
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {categories.map((category, i) => (
          <Link
            key={category.id}
            to={`/shop?category=${category.slug}`}
            className="animate-fade-in"
            style={{
              animationDelay: `${i * 100}ms`,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              padding: '32px',
              borderRadius: '16px',
              background: 'rgba(25, 31, 46, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 229, 255, 0.15)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)';
              e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.5)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 229, 255, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.15)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            }}
          >
            {/* Hover Glow Background */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.05), transparent)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
            />

            {/* Icon */}
            <div style={{
              fontSize: '3rem',
              marginBottom: '20px',
              filter: 'drop-shadow(0 0 10px rgba(0, 229, 255, 0.4))',
              display: 'inline-block',
            }}>
              {category.icon}
            </div>

            {/* Content */}
            <div style={{ flex: 1 }}>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '12px',
                letterSpacing: '0.5px',
              }}>
                {category.name}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.6,
              }}>
                {category.description}
              </p>
            </div>

            {/* Bottom Arrow */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              marginTop: '20px',
              color: 'var(--color-primary)',
            }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, marginRight: '8px' }}>
                Khám phá
              </span>
              <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
