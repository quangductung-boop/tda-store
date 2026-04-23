import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { User, ShoppingBag, Wallet, Lock, Download, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuthStore, useOrderStore, useTransactionStore } from '../stores/authStore';
import { content } from '../config/content';
import { formatCurrency, formatDate, getStatusColor, getStatusText, getTransactionTypeText, generateId } from '../utils/helpers';
import { validate } from '../utils/helpers';

export default function AccountPage() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const { user, isAuthenticated, changePassword } = useAuthStore();
  const orders = useOrderStore((s) => s.getByUserId(user?.id || ''));
  const transactions = useTransactionStore((s) => s.getByUserId(user?.id || ''));

  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  if (!isAuthenticated || !user) {
    return (
      <div className="section-container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <User size={48} style={{ color: 'var(--color-primary)' }} />
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Đăng nhập để xem tài khoản</h2>
        <Link to="/login" className="btn-neon">Đăng nhập</Link>
      </div>
    );
  }

  const tabs = [
    { id: 'profile', label: content.account.profile, icon: <User size={16} /> },
    { id: 'orders', label: content.account.orders, icon: <ShoppingBag size={16} /> },
    { id: 'transactions', label: content.account.transactions, icon: <Wallet size={16} /> },
    { id: 'password', label: content.account.changePassword, icon: <Lock size={16} /> },
  ];

  const handleChangePassword = async () => {
    const pwErr = validate.password(newPw);
    if (pwErr) { toast.error(pwErr); return; }
    if (newPw !== confirmPw) { toast.error('Mật khẩu xác nhận không khớp'); return; }
    const result = await changePassword(oldPw, newPw);
    if (result.success) { toast.success(result.message); setOldPw(''); setNewPw(''); setConfirmPw(''); }
    else toast.error(result.message);
  };

  return (
    <div className="section-container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '900px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '32px' }}>
        <span className="gradient-text">{content.account.title}</span>
      </h1>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '32px', overflowX: 'auto', paddingBottom: '4px' }}>
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '10px',
            border: '1px solid', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
            fontFamily: 'var(--font-body)', transition: 'all 0.3s',
            borderColor: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-border)',
            background: activeTab === tab.id ? 'rgba(0,229,255,0.1)' : 'transparent',
            color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
          }}>{tab.icon}{tab.label}</button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div style={{ padding: '28px', borderRadius: '18px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'linear-gradient(135deg, #7c4dff, #00e5ff)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={28} color="white" />
            </div>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: '1.2rem' }}>{user.username}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Thành viên từ {formatDate(user.created_at)}</p>
            </div>
          </div>
          {[
            { label: 'Tên đăng nhập', value: user.username },
            { label: 'Email', value: user.email || 'Chưa cập nhật' },
            { label: 'Số dư', value: formatCurrency(user.balance), highlight: true },
            { label: 'Trạng thái', value: user.is_locked ? '🔒 Bị khóa' : '✅ Hoạt động' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>{item.label}</span>
              <span style={{ fontWeight: 600, color: item.highlight ? 'var(--color-primary)' : 'var(--color-text-primary)' }}>{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        orders.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {orders.map((order) => (
              <div key={order.id || generateId()} style={{ padding: '20px', borderRadius: '14px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <img src={order.product_image || 'https://placehold.co/80x60/1a1f2e/00e5ff?text=No+Image'} alt={order.product_name || 'Sản phẩm'} style={{ width: '80px', height: '60px', borderRadius: '10px', objectFit: 'cover' }} />
                <div style={{ flex: 1, minWidth: '150px' }}>
                  <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>{order.product_name || 'Sản phẩm'}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{order.created_at ? formatDate(order.created_at) : 'Không xác định'}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 700, color: 'var(--color-primary)', marginBottom: '4px' }}>{formatCurrency(order.total_price || 0)}</p>
                  <span className={getStatusColor(order.status || 'pending')} style={{ fontSize: '0.8rem', fontWeight: 600 }}>{getStatusText(order.status || 'pending')}</span>
                </div>
                {order.status === 'completed' && order.download_url && order.download_url !== '#' && (
                  <a href={order.download_url} target="_blank" rel="noopener noreferrer" className="btn-neon" style={{ padding: '8px 16px', fontSize: '0.8rem' }}><Download size={14} />Tải xuống</a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-muted)', background: 'var(--color-bg-card)', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '12px' }}>📦</p><p>Chưa có đơn hàng nào</p>
            <Link to="/shop" className="btn-neon" style={{ marginTop: '16px', display: 'inline-flex' }}>Mua sắm ngay</Link>
          </div>
        )
      )}

      {/* Transactions Tab */}
      {activeTab === 'transactions' && (
        transactions.length > 0 ? (
          <div className="table-container">
            <table>
              <thead><tr><th>Thời gian</th><th>Loại</th><th>Mô tả</th><th>Số tiền</th><th>Số dư sau</th></tr></thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id || generateId()}>
                    <td style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{tx.created_at ? formatDate(tx.created_at) : 'Không xác định'}</td>
                    <td><span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{getTransactionTypeText(tx.type || 'unknown')}</span></td>
                    <td style={{ fontSize: '0.85rem' }}>{tx.description || ''}</td>
                    <td style={{ fontWeight: 700, color: tx.amount >= 0 ? '#00e676' : '#ff5252' }}>{tx.amount >= 0 ? '+' : ''}{formatCurrency(Math.abs(tx.amount || 0))}</td>
                    <td style={{ fontWeight: 600 }}>{formatCurrency(tx.balance_after || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--color-text-muted)', background: 'var(--color-bg-card)', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
            <p style={{ fontSize: '3rem', marginBottom: '12px' }}>📋</p><p>Chưa có giao dịch nào</p>
          </div>
        )
      )}

      {/* Change Password Tab */}
      {activeTab === 'password' && (
        <div style={{ padding: '28px', borderRadius: '18px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', maxWidth: '400px' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>{content.account.changePassword}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <input type="password" placeholder="Mật khẩu cũ" value={oldPw} onChange={(e) => setOldPw(e.target.value)} className="input-neon" />
            <input type="password" placeholder="Mật khẩu mới" value={newPw} onChange={(e) => setNewPw(e.target.value)} className="input-neon" />
            <input type="password" placeholder="Xác nhận mật khẩu mới" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} className="input-neon" />
            <button onClick={handleChangePassword} className="btn-neon" style={{ marginTop: '4px' }}>Đổi mật khẩu</button>
          </div>
        </div>
      )}
    </div>
  );
}
