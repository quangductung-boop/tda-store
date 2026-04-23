import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabase';
import { validate } from '../utils/helpers';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const uErr = validate.username(username);
    if (uErr) { toast.error(uErr); return; }
    if (!password) { toast.error('Vui lòng nhập mật khẩu'); return; }

    setLoading(true);
    
    try {
      const generatedEmail = `${username.toLowerCase().replace(/[^a-z0-9]/g, '')}@tda.local`;
      const { error } = await supabase.auth.signInWithPassword({
        email: generatedEmail,
        password
      });

      if (error) {
        if (error.message === 'Invalid login credentials' || error.status === 400) {
          throw new Error('Sai tên đăng nhập hoặc mật khẩu');
        }
        throw error;
      }

      toast.success('Xác thực thành công!');
      navigate('/');
    } catch (err: any) {
      toast.error('Sai tên đăng nhập hoặc mật khẩu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] animate-scale-in">
        <div className="glass" style={{ padding: '40px', borderRadius: '24px', border: '1px solid rgba(0, 229, 255, 0.2)', boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(0, 229, 255, 0.1)' }}>
          <div className="text-center mb-8">
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #00e5ff, #0091ea)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 10px 20px rgba(0, 229, 255, 0.3)' }}>
              <Zap size={28} color="#0a0e17" strokeWidth={3} />
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 800, marginBottom: '8px', color: '#fff' }}>Đăng nhập</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Chào mừng trở lại TDA Store</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Tên hiển thị</label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className="input-neon" 
                placeholder="Ví dụ: cyber_gamer99" 
                autoFocus 
              />
            </div>
            
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
                <span>Mật khẩu</span>
                <Link to="#" style={{ color: '#7c4dff', textDecoration: 'none', fontWeight: 500, transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = '#00e5ff'} onMouseLeave={e => e.currentTarget.style.color = '#7c4dff'}>Quên mật khẩu?</Link>
              </label>
              <div className="relative">
                <input 
                  type={showPw ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="input-neon" 
                  placeholder="Nhập mật khẩu..." 
                  style={{ paddingRight: '44px' }} 
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#00e5ff] transition-colors bg-transparent border-none cursor-pointer">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="btn-neon"
              style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>ĐĂNG NHẬP <ArrowRight size={18} /></>}
            </button>
          </form>

          <p className="text-center mt-8 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Chưa có tài khoản?{' '}
            <Link to="/register" style={{ color: '#00e5ff', textDecoration: 'none', fontWeight: 600, transition: 'text-shadow 0.3s' }} onMouseEnter={e => e.currentTarget.style.textShadow = '0 0 10px rgba(0, 229, 255, 0.5)'} onMouseLeave={e => e.currentTarget.style.textShadow = 'none'}>
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
