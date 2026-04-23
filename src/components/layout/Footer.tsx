import { Link } from 'react-router-dom';
import { Zap, Mail, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/site';
import { content } from '../../config/content';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-bg-secondary)',
      borderTop: '1px solid var(--color-border)',
      paddingTop: '64px',
      paddingBottom: '24px',
    }}>
      <div className="section-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #00e5ff, #0091ea)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Zap size={18} color="#0a0e17" strokeWidth={3} />
              </div>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800,
              }}>
                <span className="neon-text">TDA</span> Store
              </span>
            </div>
            <p style={{
              color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7,
              maxWidth: '300px',
            }}>
              {content.footer.aboutText}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontWeight: 700, marginBottom: '16px', color: 'var(--color-text-primary)',
              fontSize: '0.95rem',
            }}>
              {content.footer.quickLinks}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Link to="/shop" style={{
                color: 'var(--color-text-secondary)', textDecoration: 'none',
                fontSize: '0.875rem', transition: 'color 0.3s',
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              >
                {content.nav.shop}
              </Link>
              <Link to="/wallet" style={{
                color: 'var(--color-text-secondary)', textDecoration: 'none',
                fontSize: '0.875rem', transition: 'color 0.3s',
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              >
                {content.nav.wallet}
              </Link>
              <Link to="/support" style={{
                color: 'var(--color-text-secondary)', textDecoration: 'none',
                fontSize: '0.875rem', transition: 'color 0.3s',
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              >
                {content.nav.support}
              </Link>
              {siteConfig.footer.links.map((link) => (
                <Link key={link.path} to={link.path} style={{
                  color: 'var(--color-text-secondary)', textDecoration: 'none',
                  fontSize: '0.875rem', transition: 'color 0.3s',
                }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{
              fontWeight: 700, marginBottom: '16px', color: 'var(--color-text-primary)',
              fontSize: '0.95rem',
            }}>
              {content.footer.contact}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href={`mailto:${siteConfig.contact.email}`} style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                color: 'var(--color-text-secondary)', textDecoration: 'none',
                fontSize: '0.875rem', transition: 'color 0.3s',
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              >
                <Mail size={16} /> {siteConfig.contact.email}
              </a>
              <a href={siteConfig.contact.zalo} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                color: 'var(--color-text-secondary)', textDecoration: 'none',
                fontSize: '0.875rem', transition: 'color 0.3s',
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              >
                <MessageCircle size={16} /> Zalo Group
              </a>
              <a href={siteConfig.contact.discord} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                color: 'var(--color-text-secondary)', textDecoration: 'none',
                fontSize: '0.875rem', transition: 'color 0.3s',
              }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-text-secondary)'}
              >
                <MessageCircle size={16} /> Discord
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 style={{
              fontWeight: 700, marginBottom: '16px', color: 'var(--color-text-primary)',
              fontSize: '0.95rem',
            }}>
              {content.footer.followUs}
            </h4>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[
                { name: 'Facebook', url: siteConfig.contact.facebook, emoji: '📘' },
                { name: 'TikTok', url: siteConfig.contact.tiktok, emoji: '🎵' },
                { name: 'Discord', url: siteConfig.contact.discord, emoji: '💬' },
                { name: 'Zalo', url: siteConfig.contact.zalo, emoji: '💙' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '42px', height: '42px', borderRadius: '10px',
                    background: 'rgba(0, 229, 255, 0.05)', border: '1px solid var(--color-border)',
                    textDecoration: 'none', fontSize: '1.1rem', transition: 'all 0.3s',
                  }}
                  title={social.name}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.4)';
                    e.currentTarget.style.background = 'rgba(0, 229, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.background = 'rgba(0, 229, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {social.emoji}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
            {siteConfig.footer.copyright}
          </p>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
            Nhấn <span style={{
              padding: '2px 8px', borderRadius: '4px',
              background: 'rgba(0, 229, 255, 0.1)', border: '1px solid var(--color-border)',
              fontFamily: 'monospace', fontSize: '0.7rem',
            }}>Ctrl+Shift+A</span> để mở Admin Panel
          </p>
        </div>
      </div>
    </footer>
  );
}
