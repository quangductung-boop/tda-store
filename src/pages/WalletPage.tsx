import { Link, useNavigate } from 'react-router-dom';
import { Wallet, AlertTriangle, ArrowLeft, MessageCircle, BookOpen } from 'lucide-react';
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
          <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '16px' }}>{content.wallet.deposit}</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>Liên hệ admin để nạp tiền vào tài khoản. Hỗ trợ nhiều phương thức thanh toán.</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href={siteConfig.contact.zalo} target="_blank" rel="noopener noreferrer" className="btn-neon" style={{ padding: '10px 24px' }}><MessageCircle size={16} />Liên hệ Zalo</a>
            <Link to="/support" className="btn-outline" style={{ padding: '10px 24px' }}><BookOpen size={16} />{content.wallet.depositGuide}</Link>
          </div>
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
