import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Zap, User, Wallet, ShoppingBag, LogOut, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { content } from '../../config/content';
import { formatCurrency } from '../../utils/helpers';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { label: content.nav.home, path: '/' },
    { label: content.nav.shop, path: '/shop' },
    { label: content.nav.wallet, path: '/wallet' },
    { label: content.nav.support, path: '/support' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid rgba(0, 229, 255, 0.1)',
    }}>
      <div className="section-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
          color: 'inherit',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00e5ff, #0091ea)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Zap size={22} color="#0a0e17" strokeWidth={3} />
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 800,
            letterSpacing: '0.05em',
          }}>
            <span className="neon-text">TDA</span>
            <span style={{ color: 'var(--color-text-primary)' }}> Store</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }} className="hidden md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                color: isActive(link.path) ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                background: isActive(link.path) ? 'rgba(0, 229, 255, 0.08)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.path)) {
                  e.currentTarget.style.color = 'var(--color-primary)';
                  e.currentTarget.style.background = 'rgba(0, 229, 255, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.path)) {
                  e.currentTarget.style.color = 'var(--color-text-secondary)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* User Area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isAuthenticated && user ? (
            <>
              {/* Balance */}
              <Link to="/wallet" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '10px',
                background: 'rgba(0, 229, 255, 0.08)',
                border: '1px solid rgba(0, 229, 255, 0.15)',
                textDecoration: 'none',
                color: 'var(--color-primary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'all 0.3s',
              }} className="hidden sm:flex"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.4)';
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 229, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Wallet size={14} />
                {formatCurrency(user.balance)}
              </Link>

              {/* User dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '10px',
                    background: 'rgba(124, 77, 255, 0.1)',
                    border: '1px solid rgba(124, 77, 255, 0.2)',
                    color: 'var(--color-text-primary)',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    transition: 'all 0.3s',
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    background: 'linear-gradient(135deg, #7c4dff, #00e5ff)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <User size={14} color="white" />
                  </div>
                  <span className="hidden sm:inline">{user.username}</span>
                  <ChevronDown size={14} style={{
                    transform: isUserMenuOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s',
                  }} />
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    <div
                      style={{ position: 'fixed', inset: 0, zIndex: 40 }}
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="animate-slide-down" style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      width: '220px',
                      background: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '14px',
                      padding: '8px',
                      zIndex: 50,
                      boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                    }}>
                      {/* Balance mobile */}
                      <div className="sm:hidden" style={{
                        padding: '10px 12px',
                        marginBottom: '4px',
                        borderRadius: '8px',
                        background: 'rgba(0, 229, 255, 0.05)',
                        fontSize: '0.85rem',
                        color: 'var(--color-primary)',
                        fontWeight: 600,
                      }}>
                        💰 {formatCurrency(user.balance)}
                      </div>

                      <Link to="/account" onClick={() => setIsUserMenuOpen(false)} style={{
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                        borderRadius: '8px', textDecoration: 'none', color: 'var(--color-text-primary)',
                        fontSize: '0.875rem', transition: 'background 0.2s',
                      }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.08)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <User size={16} /> {content.nav.account}
                      </Link>

                      <Link to="/account?tab=orders" onClick={() => setIsUserMenuOpen(false)} style={{
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                        borderRadius: '8px', textDecoration: 'none', color: 'var(--color-text-primary)',
                        fontSize: '0.875rem', transition: 'background 0.2s',
                      }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.08)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <ShoppingBag size={16} /> {content.nav.orders}
                      </Link>

                      <Link to="/wallet" onClick={() => setIsUserMenuOpen(false)} style={{
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                        borderRadius: '8px', textDecoration: 'none', color: 'var(--color-text-primary)',
                        fontSize: '0.875rem', transition: 'background 0.2s',
                      }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,229,255,0.08)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <Wallet size={16} /> {content.nav.wallet}
                      </Link>

                      <div style={{ height: '1px', background: 'var(--color-border)', margin: '4px 0' }} />

                      <button onClick={handleLogout} style={{
                        display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                        borderRadius: '8px', background: 'transparent', border: 'none',
                        color: '#ff5252', cursor: 'pointer', fontSize: '0.875rem',
                        width: '100%', textAlign: 'left', transition: 'background 0.2s',
                      }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,82,82,0.08)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <LogOut size={16} /> {content.nav.logout}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link to="/login" className="btn-ghost hidden sm:flex">{content.nav.login}</Link>
              <Link to="/register" className="btn-neon" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
                {content.nav.register}
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
            style={{
              padding: '8px',
              borderRadius: '8px',
              background: 'transparent',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
            }}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-slide-down" style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--color-border)',
          background: 'var(--color-bg-secondary)',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: 'block',
                padding: '12px 16px',
                borderRadius: '10px',
                textDecoration: 'none',
                color: isActive(link.path) ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                background: isActive(link.path) ? 'rgba(0, 229, 255, 0.08)' : 'transparent',
                fontWeight: 500,
                marginBottom: '4px',
              }}
            >
              {link.label}
            </Link>
          ))}
          {!isAuthenticated && (
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: 'block',
                padding: '12px 16px',
                borderRadius: '10px',
                textDecoration: 'none',
                color: 'var(--color-text-secondary)',
                fontWeight: 500,
              }}
            >
              {content.nav.login}
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
