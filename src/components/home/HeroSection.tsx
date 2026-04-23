import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Star, Zap } from 'lucide-react';
import { content } from '../../config/content';
import { siteConfig } from '../../config/site';
import { themeConfig } from '../../config/theme';

export default function HeroSection() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: themeConfig.heroWallpaper
          ? `url(${themeConfig.heroWallpaper}) center/cover no-repeat`
          : 'linear-gradient(135deg, #0a0e17 0%, #111827 50%, #0a0e17 100%)',
      }} />

      {/* Animated background orbs */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%)',
        top: '-200px',
        right: '-200px',
        filter: 'blur(60px)',
      }} className="animate-float" />
      <div style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124, 77, 255, 0.08) 0%, transparent 70%)',
        bottom: '-100px',
        left: '-100px',
        filter: 'blur(60px)',
      }} className="animate-float delay-300" />

      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0, 229, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 229, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        opacity: 0.5,
      }} />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, rgba(10,14,23,0.4) 0%, rgba(10,14,23,0.9) 100%)',
      }} />

      {/* Content */}
      <div className="section-container" style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '120px 20px 80px',
      }}>
        {/* Badges */}
        <div className="animate-fade-in" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '28px',
          flexWrap: 'wrap',
        }}>
          {siteConfig.badges.map((badge, i) => (
            <span key={i} className={`badge badge-${badge.color}`}>
              {badge.text}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="animate-fade-in delay-100" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: '20px',
          letterSpacing: '0.02em',
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #00e5ff, #18ffff, #7c4dff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(0, 229, 255, 0.3))',
          }}>
            {content.hero.title}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in delay-200" style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: '12px',
          letterSpacing: '0.03em',
        }}>
          {content.hero.subtitle}
        </p>

        {/* Description */}
        <p className="animate-fade-in delay-300" style={{
          fontSize: '1rem',
          color: 'var(--color-text-secondary)',
          marginBottom: '36px',
          maxWidth: '600px',
          margin: '0 auto 36px',
          lineHeight: 1.7,
        }}>
          {content.hero.description}
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in delay-400" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '56px',
          flexWrap: 'wrap',
        }}>
          <Link to="/shop" className="btn-neon" style={{ padding: '14px 36px', fontSize: '1rem' }}>
            <Zap size={18} />
            {content.hero.cta.primary}
            <ArrowRight size={18} />
          </Link>
          <Link to="/wallet" className="btn-outline" style={{ padding: '14px 36px', fontSize: '1rem' }}>
            {content.hero.cta.secondary}
          </Link>
        </div>

        {/* Stats */}
        <div className="animate-fade-in delay-500" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          maxWidth: '700px',
          margin: '0 auto',
        }}>
          {content.hero.stats.map((stat, i) => (
            <div key={i} style={{
              padding: '20px 12px',
              borderRadius: '14px',
              background: 'rgba(0, 229, 255, 0.04)',
              border: '1px solid rgba(0, 229, 255, 0.1)',
              transition: 'all 0.3s',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.3)';
                e.currentTarget.style.background = 'rgba(0, 229, 255, 0.08)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.1)';
                e.currentTarget.style.background = 'rgba(0, 229, 255, 0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                fontWeight: 800,
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-display)',
                marginBottom: '4px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-secondary)',
                fontWeight: 500,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
