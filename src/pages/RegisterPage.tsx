import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../stores/authStore';
import { content } from '../config/content';
import { validate } from '../utils/helpers';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const uErr = validate.username(username);
    if (uErr) { toast.error(uErr); return; }
    const eErr = validate.email(email);
    if (eErr) { toast.error(eErr); return; }
    const pErr = validate.password(password);
    if (pErr) { toast.error(pErr); return; }
    if (password !== confirmPw) { toast.error('Mật khẩu xác nhận không khớp'); return; }

    setLoading(true);
    const result = await register(username, password, email || undefined);
    setLoading(false);

    if (result.success) { toast.success(result.message); navigate('/'); }
    else toast.error(result.message);
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="animate-scale-in" style={{ width: '100%', maxWidth: '420px', padding: '40px', borderRadius: '24px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #00e5ff, #0091ea)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Zap size={28} color="#0a0e17" strokeWidth={3} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '4px' }}>{content.auth.register.title}</h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{content.auth.register.subtitle}</p>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '6px' }}>{content.auth.register.username}</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input-neon" placeholder="Nhập tên đăng nhập" autoFocus />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '6px' }}>{content.auth.register.email}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-neon" placeholder="example@email.com" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '6px' }}>{content.auth.register.password}</label>
            <div style={{ position: 'relative' }}>
              <input type={showPw ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="input-neon" placeholder="Tối thiểu 6 ký tự" style={{ paddingRight: '44px' }} />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '6px' }}>{content.auth.register.confirmPassword}</label>
            <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} className="input-neon" placeholder="Nhập lại mật khẩu" />
          </div>
          <button type="submit" className="btn-neon" style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }} disabled={loading}>
            {loading ? content.common.loading : content.auth.register.submit}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
          {content.auth.register.hasAccount}{' '}
          <Link to="/login" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>{content.auth.register.login}</Link>
        </p>
      </div>
    </div>
  );
}
