import { Link, useNavigate } from 'react-router-dom';
import { Wallet, AlertTriangle, ArrowLeft, MessageCircle, BookOpen, CreditCard, QrCode } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore, useTransactionStore } from '../stores/authStore';
import { useSettingsStore } from '../stores/appStore';
import { content } from '../config/content';
import { formatCurrency, formatDate, getTransactionTypeText, getStatusColor, getStatusText } from '../utils/helpers';
import { siteConfig } from '../config/site';

export default function WalletPage() {
  const { user, isAuthenticated } = useAuthStore();
  const settings = useSettingsStore((s) => s.settings);
  const getByUserId = useTransactionStore((s) => s.getByUserId);
  const navigate = useNavigate();
  const [depositMethod, setDepositMethod] = useState<'bank' | 'card'>('bank');

  if (!isAuthenticated || !user) {
    return (
      <div className="section-container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <Wallet size={48} style={{ color: 'var(--color-primary)' }} />
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Đăng nhập để xem ví</h2>
        <Link to="/login" className="btn-neon">Đăng nhập</Link>
      </div>
    );
  }

  const transactions = getByUserId(user.id);
  const isMaintenance = settings.deposit_maintenance || !settings.deposit_enabled;

  return (
    <div className="section-container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '800px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '32px' }}>
        <span className="gradient-text">{content.wallet.title}</span>
      </h1>

      {/* Balance Card */}
      <div style={{ padding: '32px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(0,229,255,0.08), rgba(124,77,255,0.05))', border: '1px solid rgba(0,229,255,0.2)', marginBottom: '32px', textAlign: 'center' }} className="animate-pulse-glow">
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>{content.wallet.balance}</p>
        <p style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>{formatCurrency(user.balance)}</p>
      </div>

      {/* Deposit Section */}
      {isMaintenance ? (
        <div style={{ padding: '32px', borderRadius: '18px', background: 'rgba(255,193,7,0.05)', border: '1px solid rgba(255,193,7,0.2)', marginBottom: '32px', textAlign: 'center' }}>
          <AlertTriangle size={40} style={{ color: '#ffc107', marginBottom: '16px' }} />
          <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '8px', color: '#ffc107' }}>Bảo trì hệ thống</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>{settings.maintenance_message || content.wallet.maintenance}</p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn-outline" style={{ padding: '10px 24px' }}><ArrowLeft size={16} />{content.wallet.backHome}</Link>
            <Link to="/support" className="btn-ghost"><MessageCircle size={16} />{content.wallet.contactSupport}</Link>
          </div>
        </div>
      ) : (
        <div style={{ padding: '28px', borderRadius: '18px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', marginBottom: '32px' }}>
          <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Wallet className="text-[#00e5ff]" size={20} /> Nạp Tiền Vào Tài Khoản
          </h3>
          
          {/* Method selector */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setDepositMethod('bank')}
              style={{
                flex: 1, minWidth: '150px', padding: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 600, transition: 'all 0.3s',
                background: depositMethod === 'bank' ? 'rgba(0,229,255,0.1)' : 'rgba(255,255,255,0.05)',
                border: depositMethod === 'bank' ? '1px solid #00e5ff' : '1px solid rgba(255,255,255,0.1)',
                color: depositMethod === 'bank' ? '#00e5ff' : 'var(--color-text-secondary)',
                cursor: 'pointer'
              }}
            >
              <QrCode size={18} /> Chuyển Khoản Ngân Hàng
            </button>
            <button 
              onClick={() => setDepositMethod('card')}
              style={{
                flex: 1, minWidth: '150px', padding: '14px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 600, transition: 'all 0.3s',
                background: depositMethod === 'card' ? 'rgba(124,77,255,0.1)' : 'rgba(255,255,255,0.05)',
                border: depositMethod === 'card' ? '1px solid #7c4dff' : '1px solid rgba(255,255,255,0.1)',
                color: depositMethod === 'card' ? '#7c4dff' : 'var(--color-text-secondary)',
                cursor: 'pointer'
              }}
            >
              <CreditCard size={18} /> Nạp Thẻ Cào (Tự Động)
            </button>
          </div>

          {depositMethod === 'bank' && (
            <div className="animate-fade-in" style={{ padding: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                <div style={{ background: '#fff', padding: '16px', borderRadius: '12px', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <QrCode size={150} color="#000" />
                </div>
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <h4 style={{ color: '#00e5ff', fontWeight: 700, marginBottom: '16px', fontSize: '1.1rem' }}>Thông tin chuyển khoản</h4>
                  <div style={{ display: 'grid', gap: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Ngân hàng</span>
                      <span style={{ fontWeight: 600 }}>MB Bank</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Số tài khoản</span>
                      <span style={{ fontWeight: 700, letterSpacing: '1px', color: '#00e5ff' }}>0123456789</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Chủ tài khoản</span>
                      <span style={{ fontWeight: 600 }}>NGUYEN VAN A</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Nội dung</span>
                      <span style={{ fontWeight: 700, color: '#ff4081' }}>TDA {user.username || user.email?.split('@')[0]}</span>
                    </div>
                  </div>
                  <p style={{ marginTop: '16px', fontSize: '0.85rem', color: '#ffc107', fontStyle: 'italic' }}>*Hệ thống sẽ tự động cộng tiền trong 1-3 phút sau khi nhận được chuyển khoản có đúng nội dung.</p>
                </div>
              </div>
            </div>
          )}

          {depositMethod === 'card' && (
            <div className="animate-fade-in" style={{ padding: '24px', background: 'rgba(0,0,0,0.2)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Loại thẻ</label>
                  <select className="input-neon" style={{ width: '100%', appearance: 'none' }}>
                    <option value="VIETTEL">Viettel</option>
                    <option value="VINAPHONE">Vinaphone</option>
                    <option value="MOBIFONE">Mobifone</option>
                    <option value="ZING">Zing</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Mệnh giá</label>
                  <select className="input-neon" style={{ width: '100%', appearance: 'none' }}>
                    <option value="10000">10,000đ</option>
                    <option value="20000">20,000đ</option>
                    <option value="50000">50,000đ</option>
                    <option value="100000">100,000đ</option>
                    <option value="200000">200,000đ</option>
                    <option value="500000">500,000đ</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Số Seri</label>
                <input type="text" className="input-neon" placeholder="Nhập số seri in trên thẻ" />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '8px' }}>Mã Thẻ</label>
                <input type="text" className="input-neon" placeholder="Nhập mã thẻ cào" />
              </div>
              <button className="btn-neon" style={{ width: '100%', padding: '14px', fontSize: '1rem' }}>
                NẠP THẺ NGAY
              </button>
            </div>
          )}
        </div>
      )}

      {/* Transaction History */}
      <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '16px' }}>{content.wallet.history}</h3>
      {transactions.length > 0 ? (
        <div className="table-container">
          <table>
            <thead><tr><th>Thời gian</th><th>Loại</th><th>Số tiền</th><th>Trạng thái</th></tr></thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id}>
                  <td style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{formatDate(tx.created_at)}</td>
                  <td><span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{getTransactionTypeText(tx.type)}</span></td>
                  <td style={{ fontWeight: 700, color: tx.amount >= 0 ? '#00e676' : '#ff5252' }}>{tx.amount >= 0 ? '+' : ''}{formatCurrency(Math.abs(tx.amount))}</td>
                  <td><span className={getStatusColor(tx.status)} style={{ fontSize: '0.85rem', fontWeight: 600 }}>{getStatusText(tx.status)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--color-text-muted)', background: 'var(--color-bg-card)', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
          <p style={{ fontSize: '2rem', marginBottom: '8px' }}>📋</p>
          <p>Chưa có giao dịch nào</p>
        </div>
      )}
    </div>
  );
}
