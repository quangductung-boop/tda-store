import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../stores/authStore';
import { content } from '../config/content';
import { validate } from '../utils/helpers';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const uErr = validate.username(username);
    if (uErr) { toast.error(uErr); return; }
    const pErr = validate.password(password);
    if (pErr) { toast.error(pErr); return; }

    setLoading(true);
    const success = await login(username, password);
    setLoading(false);

    if (success) { toast.success('Đăng nhập thành công!'); navigate('/'); }
    else toast.error('Sai tên đăng nhập hoặc mật khẩu');
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="animate-scale-in" style={{ width: '100%', maxWidth: '420px', padding: '40px', borderRadius: '24px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #00e5ff, #0091ea)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Zap size={28} color="#0a0e17" strokeWidth={3} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '4px' }}>{content.auth.login.title}</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{content.auth.login.subtitle}</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '6px' }}>{content.auth.login.username}</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input-neon" placeholder="Nhập tên đăng nhập" autoFocus />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '6px' }}>{content.auth.login.password}</label>
            <div style={{ position: 'relative' }}>
              <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="input-neon" placeholder="Nhập mật khẩu" style={{ paddingRight: '44px' }} />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button type="submit" className="btn-neon" style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }} disabled={loading}>
            {loading ? content.common.loading : content.auth.login.submit}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          {content.auth.login.noAccount}{' '}
          <Link to="/register" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>{content.auth.login.register}</Link>
        </p>
      </div>
    </div>
  );
}
