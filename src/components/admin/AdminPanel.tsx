import { useState } from 'react';
import { X, Zap, LayoutDashboard, Package, Users, ShoppingBag, CreditCard, Settings, FileText, LogOut, Plus, Minus, Edit, Trash2, Lock, Unlock, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdminStore, useProductStore, useSettingsStore } from '../../stores/appStore';
import { useAuthStore, useTransactionStore, useOrderStore } from '../../stores/authStore';
import { content } from '../../config/content';
import { formatCurrency, formatDate, getStatusText, getStatusColor, generateId } from '../../utils/helpers';
import { categories } from '../../data/categories';

export default function AdminPanel() {
  const { isAdminLoggedIn, loginAdmin, logoutAdmin, setShowAdminPanel, addAuditLog, adminUsername, auditLogs } = useAdminStore();
  const [loginUser, setLoginUser] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAdminLoggedIn) {
    return (
      <div className="modal-overlay" style={{ zIndex: 200 }}>
        <div className="modal-content" style={{ maxWidth: '400px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap size={20} style={{ color: 'var(--color-primary)' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem' }}>{content.admin.login.title}</span>
            </div>
            <button onClick={() => setShowAdminPanel(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}><X size={20} /></button>
          </div>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>{content.admin.login.subtitle}</p>
          <form onSubmit={(e) => { e.preventDefault(); if (loginAdmin(loginUser, loginPw)) { toast.success('Đăng nhập admin thành công'); } else { toast.error('Sai thông tin admin'); } }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input value={loginUser} onChange={(e) => setLoginUser(e.target.value)} className="input-neon" placeholder="Username" autoFocus />
            <input type="password" value={loginPw} onChange={(e) => setLoginPw(e.target.value)} className="input-neon" placeholder="Password" />
            <button type="submit" className="btn-neon" style={{ width: '100%' }}>Đăng nhập</button>
          </form>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'dashboard', label: content.admin.dashboard, icon: <LayoutDashboard size={18} /> },
    { id: 'products', label: content.admin.products, icon: <Package size={18} /> },
    { id: 'users', label: content.admin.users, icon: <Users size={18} /> },
    { id: 'orders', label: content.admin.orders, icon: <ShoppingBag size={18} /> },
    { id: 'transactions', label: content.admin.transactions, icon: <CreditCard size={18} /> },
    { id: 'settings', label: content.admin.settings, icon: <Settings size={18} /> },
    { id: 'logs', label: content.admin.auditLogs, icon: <FileText size={18} /> },
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', background: 'var(--color-bg-primary)' }} className="animate-fade-in-fast">
      {/* Sidebar */}
      <div className="admin-sidebar" style={{ width: '240px', display: 'flex', flexDirection: 'column', padding: '20px 12px', overflowY: 'auto', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', marginBottom: '24px' }}>
          <Zap size={20} style={{ color: 'var(--color-primary)' }} />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem' }}>Admin Panel</span>
        </div>
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px',
            background: activeTab === tab.id ? 'rgba(0,229,255,0.1)' : 'transparent',
            color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, width: '100%',
            textAlign: 'left', transition: 'all 0.2s', marginBottom: '2px', fontFamily: 'var(--font-body)',
          }}>{tab.icon}{tab.label}</button>
        ))}
        <div style={{ flex: 1 }} />
        <button onClick={() => { logoutAdmin(); setShowAdminPanel(false); }} style={{
          display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px',
          background: 'transparent', color: '#ff5252', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, width: '100%', fontFamily: 'var(--font-body)',
        }}><LogOut size={18} />Đăng xuất</button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '24px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800 }}>{tabs.find(t => t.id === activeTab)?.label}</h2>
          <button onClick={() => setShowAdminPanel(false)} style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: '10px', color: 'var(--color-text-muted)', cursor: 'pointer', padding: '8px 16px', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }}>Đóng (ESC)</button>
        </div>

        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'products' && <ProductsTab adminUsername={adminUsername} addAuditLog={addAuditLog} />}
        {activeTab === 'users' && <UsersTab adminUsername={adminUsername} addAuditLog={addAuditLog} />}
        {activeTab === 'orders' && <OrdersTab adminUsername={adminUsername} addAuditLog={addAuditLog} />}
        {activeTab === 'transactions' && <TransactionsTab />}
        {activeTab === 'settings' && <SettingsTab adminUsername={adminUsername} addAuditLog={addAuditLog} />}
        {activeTab === 'logs' && <LogsTab logs={auditLogs} />}
      </div>
    </div>
  );
}

function DashboardTab() {
  const users = useAuthStore((s) => s.users);
  const products = useProductStore((s) => s.products);
  const orders = useOrderStore((s) => s.orders);
  const transactions = useTransactionStore((s) => s.transactions);
  const stats = [
    { label: 'Người dùng', value: users.length, icon: '👥', color: '#00e5ff' },
    { label: 'Sản phẩm', value: products.length, icon: '📦', color: '#7c4dff' },
    { label: 'Đơn hàng', value: orders.length, icon: '🛒', color: '#00e676' },
    { label: 'Giao dịch', value: transactions.length, icon: '💳', color: '#ffc107' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      {stats.map((s, i) => (
        <div key={i} style={{ padding: '24px', borderRadius: '16px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{s.icon}</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color, fontFamily: 'var(--font-display)' }}>{s.value}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

function ProductsTab({ adminUsername, addAuditLog }: any) {
  const { products, updateProduct, deleteProduct, addProduct } = useProductStore();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', price: '', image_url: '', short_description: '', download_url: '', slug: '', description: '', category_id: categories[0]?.id || 'cat-1' });
  const [showAdd, setShowAdd] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error('Ảnh tối đa 2MB'); return; }
    const reader = new FileReader();
    reader.onloadend = () => setForm(prev => ({ ...prev, image_url: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const resetForm = () => setForm({ name: '', price: '', image_url: '', short_description: '', download_url: '', slug: '', description: '', category_id: categories[0]?.id || 'cat-1' });
  const startEdit = (p: any) => { setEditing(p.id); setShowAdd(false); setForm({ name: p.name, price: String(p.price), image_url: p.image_url, short_description: p.short_description, download_url: p.download_url, slug: p.slug, description: p.description, category_id: p.category_id || categories[0]?.id || 'cat-1' }); };
  const saveEdit = () => {
    if (!editing || !form.name || !form.price) { toast.error('Điền đầy đủ tên và giá'); return; }
    const old = products.find(p => p.id === editing);
    updateProduct(editing, { name: form.name, slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'), price: Number(form.price), image_url: form.image_url, short_description: form.short_description, description: form.description || form.short_description, download_url: form.download_url, category_id: form.category_id });
    addAuditLog({ admin_id: 'admin', admin_username: adminUsername, action: 'Sửa sản phẩm', target_type: 'product', target_id: editing, details: `Sửa: ${old?.name} → ${form.name}`, old_value: old?.name, new_value: form.name });
    toast.success('Đã cập nhật sản phẩm'); setEditing(null); resetForm();
  };
  const handleDelete = (id: string, name: string) => {
    if (!confirm(`Xóa sản phẩm "${name}"?`)) return;
    deleteProduct(id);
    addAuditLog({ admin_id: 'admin', admin_username: adminUsername, action: 'Xóa sản phẩm', target_type: 'product', target_id: id, details: `Xóa: ${name}` });
    toast.success('Đã xóa sản phẩm');
  };
  const handleAdd = () => {
    if (!form.name || !form.price) { toast.error('Điền đầy đủ tên và giá'); return; }
    addProduct({ name: form.name, slug: form.slug || form.name.toLowerCase().replace(/\s+/g, '-'), price: Number(form.price), image_url: form.image_url || 'https://placehold.co/400x300/1a1f2e/00e5ff?text=New', short_description: form.short_description, description: form.description || form.short_description, download_url: form.download_url, category_id: form.category_id, is_active: true, is_featured: false, stock: 99, sold_count: 0, tags: [], original_price: undefined });
    addAuditLog({ admin_id: 'admin', admin_username: adminUsername, action: 'Thêm sản phẩm', target_type: 'product', target_id: 'new', details: `Thêm: ${form.name}` });
    toast.success('Đã thêm sản phẩm'); setShowAdd(false); resetForm();
  };

  return (
    <div>
      <button onClick={() => { setShowAdd(!showAdd); setEditing(null); resetForm(); }} className="btn-neon" style={{ marginBottom: '16px', padding: '8px 20px', fontSize: '0.85rem' }}><Plus size={16} />Thêm sản phẩm</button>
      {(showAdd || editing) && (
        <div style={{ padding: '20px', borderRadius: '14px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', marginBottom: '16px' }}>
          <h4 style={{ marginBottom: '12px', fontWeight: 700, color: 'var(--color-primary)' }}>{editing ? '✏️ Sửa sản phẩm' : '➕ Thêm sản phẩm mới'}</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div><label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Tên sản phẩm *</label><input className="input-neon" placeholder="VD: Elden Ring" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
            <div><label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Giá (VNĐ) *</label><input className="input-neon" placeholder="VD: 350000" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} /></div>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Danh mục *</label>
              <select className="input-neon" value={form.category_id} onChange={e => setForm({...form, category_id: e.target.value})} style={{ appearance: 'auto' }}>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.icon} {cat.name}</option>
                ))}
              </select>
            </div>
            <div><label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Link tải (sau khi mua)</label><input className="input-neon" placeholder="https://drive.google.com/..." value={form.download_url} onChange={e => setForm({...form, download_url: e.target.value})} /></div>
            <div><label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Mô tả ngắn</label><input className="input-neon" placeholder="Mô tả 1 dòng" value={form.short_description} onChange={e => setForm({...form, short_description: e.target.value})} /></div>
          </div>
          <div style={{ marginTop: '12px' }}><label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Mô tả chi tiết</label><textarea className="input-neon" rows={3} placeholder="Mô tả đầy đủ sản phẩm..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={{ resize: 'vertical' }} /></div>
          {/* Image upload */}
          <div style={{ marginTop: '12px', display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '4px' }}>Ảnh sản phẩm (upload hoặc URL)</label>
              <input className="input-neon" placeholder="URL ảnh hoặc upload bên dưới" value={form.image_url.startsWith('data:') ? '📷 Ảnh đã upload' : form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} />
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }} />
            </div>
            {form.image_url && (
              <div style={{ width: '120px', height: '90px', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)', flexShrink: 0 }}>
                <img src={form.image_url} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/120x90/1a1f2e/00e5ff?text=Error'; }} />
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <button onClick={editing ? saveEdit : handleAdd} className="btn-neon" style={{ padding: '10px 24px', fontSize: '0.85rem' }}>{editing ? '💾 Lưu thay đổi' : '➕ Thêm sản phẩm'}</button>
            <button onClick={() => { setEditing(null); setShowAdd(false); resetForm(); }} className="btn-ghost">Hủy</button>
          </div>
        </div>
      )}
      <div className="table-container">
        <table>
          <thead><tr><th>Ảnh</th><th>Tên</th><th>Giá</th><th>Link tải</th><th>Đã bán</th><th>Kho</th><th>Thao tác</th></tr></thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td><img src={p.image_url} alt="" style={{ width: '60px', height: '45px', borderRadius: '6px', objectFit: 'cover' }} /></td>
                <td style={{ fontWeight: 600, maxWidth: '200px' }}>{p.name}</td>
                <td style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{formatCurrency(p.price)}</td>
                <td style={{ fontSize: '0.75rem', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.download_url === '#' ? <span style={{color:'#ff5252'}}>⚠️ Chưa có</span> : <span style={{color:'#00e676'}}>✅ Có link</span>}</td>
                <td>{p.sold_count}</td>
                <td>{p.stock}</td>
                <td>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => startEdit(p)} className="btn-ghost" style={{ padding: '4px 8px' }} title="Sửa"><Edit size={14} /></button>
                    <button onClick={() => handleDelete(p.id, p.name)} className="btn-ghost" style={{ padding: '4px 8px', color: '#ff5252' }} title="Xóa"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UsersTab({ adminUsername, addAuditLog }: any) {
  const { users, updateBalance, toggleLockUser } = useAuthStore();
  const addTransaction = useTransactionStore((s) => s.addTransaction);
  const [amountMap, setAmountMap] = useState<Record<string, string>>({});

  const handleBalance = (userId: string, username: string, isAdd: boolean) => {
    const amt = Number(amountMap[userId] || 0);
    if (!amt || amt <= 0) { toast.error('Nhập số tiền hợp lệ'); return; }
    const user = users.find(u => u.id === userId);
    if (!user) return;
    const change = isAdd ? amt : -amt;
    updateBalance(userId, change);
    addTransaction({ user_id: userId, type: isAdd ? 'admin_add' : 'admin_deduct', amount: change, balance_before: user.balance, balance_after: user.balance + change, description: `Admin ${isAdd ? 'cộng' : 'trừ'} ${formatCurrency(amt)}`, status: 'completed' });
    addAuditLog({ admin_id: 'admin', admin_username: adminUsername, action: isAdd ? 'Cộng tiền' : 'Trừ tiền', target_type: 'user', target_id: userId, details: `${username}: ${isAdd ? '+' : '-'}${formatCurrency(amt)}`, old_value: String(user.balance), new_value: String(user.balance + change) });
    toast.success(`Đã ${isAdd ? 'cộng' : 'trừ'} ${formatCurrency(amt)} cho ${username}`);
    setAmountMap(prev => ({ ...prev, [userId]: '' }));
  };

  const handleLock = (userId: string, username: string, isLocked: boolean) => {
    toggleLockUser(userId);
    addAuditLog({ admin_id: 'admin', admin_username: adminUsername, action: isLocked ? 'Mở khóa user' : 'Khóa user', target_type: 'user', target_id: userId, details: `${username}: ${isLocked ? 'Mở khóa' : 'Khóa'}` });
    toast.success(`Đã ${isLocked ? 'mở khóa' : 'khóa'} ${username}`);
  };

  return (
    <div className="table-container">
      <table>
        <thead><tr><th>Username</th><th>Số dư</th><th>Trạng thái</th><th>Ngày tạo</th><th>Cộng/Trừ tiền</th><th>Thao tác</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td style={{ fontWeight: 600 }}>{u.username}</td>
              <td style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{formatCurrency(u.balance)}</td>
              <td><span className={`badge ${u.is_locked ? 'badge-pink' : 'badge-green'}`}>{u.is_locked ? '🔒 Khóa' : '✅ OK'}</span></td>
              <td style={{ fontSize: '0.8rem' }}>{formatDate(u.created_at)}</td>
              <td>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <input type="number" className="input-neon" style={{ width: '100px', padding: '6px 8px', fontSize: '0.8rem' }} placeholder="Số tiền" value={amountMap[u.id] || ''} onChange={e => setAmountMap(prev => ({ ...prev, [u.id]: e.target.value }))} />
                  <button onClick={() => handleBalance(u.id, u.username, true)} className="btn-ghost" style={{ padding: '4px 6px', color: '#00e676' }}><Plus size={14} /></button>
                  <button onClick={() => handleBalance(u.id, u.username, false)} className="btn-ghost" style={{ padding: '4px 6px', color: '#ff5252' }}><Minus size={14} /></button>
                </div>
              </td>
              <td><button onClick={() => handleLock(u.id, u.username, u.is_locked)} className="btn-ghost" style={{ padding: '4px 8px' }}>{u.is_locked ? <Unlock size={14} /> : <Lock size={14} />}</button></td>
            </tr>
          ))}
          {users.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>Chưa có người dùng</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function OrdersTab({ adminUsername, addAuditLog }: any) {
  const { orders, updateStatus } = useOrderStore();
  const handleStatus = (orderId: string, status: string) => {
    updateStatus(orderId, status as any);
    addAuditLog({ admin_id: 'admin', admin_username: adminUsername, action: 'Đổi trạng thái đơn', target_type: 'order', target_id: orderId, details: `Đơn ${orderId}: → ${status}` });
    toast.success('Đã cập nhật trạng thái');
  };
  return (
    <div className="table-container">
      <table>
        <thead><tr><th>ID</th><th>Sản phẩm</th><th>Tổng tiền</th><th>Trạng thái</th><th>Ngày</th><th>Thao tác</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id || generateId()}>
              <td style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{o.id ? o.id.slice(0, 8) : 'unknown'}</td>
              <td style={{ fontWeight: 600 }}>{o.product_name || 'Sản phẩm'}</td>
              <td style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{formatCurrency(o.total_price || 0)}</td>
              <td><span className={getStatusColor(o.status || 'pending')} style={{ fontWeight: 600, fontSize: '0.85rem' }}>{getStatusText(o.status || 'pending')}</span></td>
              <td style={{ fontSize: '0.8rem' }}>{o.created_at ? formatDate(o.created_at) : 'Không xác định'}</td>
              <td>
                <select className="input-neon" style={{ padding: '4px 8px', fontSize: '0.75rem', width: 'auto' }} value={o.status || 'pending'} onChange={e => handleStatus(o.id, e.target.value)}>
                  <option value="pending">Đang xử lý</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                  <option value="refunded">Hoàn tiền</option>
                </select>
              </td>
            </tr>
          ))}
          {orders.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>Chưa có đơn hàng</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function TransactionsTab() {
  const transactions = useTransactionStore((s) => s.transactions);
  return (
    <div className="table-container">
      <table>
        <thead><tr><th>ID</th><th>Loại</th><th>Số tiền</th><th>Mô tả</th><th>Trạng thái</th><th>Ngày</th></tr></thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id || generateId()}>
              <td style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{tx.id ? tx.id.slice(0, 8) : 'unknown'}</td>
              <td><span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>{tx.type || 'unknown'}</span></td>
              <td style={{ fontWeight: 700, color: tx.amount >= 0 ? '#00e676' : '#ff5252' }}>{tx.amount >= 0 ? '+' : ''}{formatCurrency(Math.abs(tx.amount || 0))}</td>
              <td style={{ fontSize: '0.85rem' }}>{tx.description || ''}</td>
              <td><span className={getStatusColor(tx.status || 'completed')} style={{ fontWeight: 600, fontSize: '0.85rem' }}>{getStatusText(tx.status || 'completed')}</span></td>
              <td style={{ fontSize: '0.8rem' }}>{tx.created_at ? formatDate(tx.created_at) : 'Không xác định'}</td>
            </tr>
          ))}
          {transactions.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>Chưa có giao dịch</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

function SettingsTab({ adminUsername, addAuditLog }: any) {
  const { settings, updateSettings } = useSettingsStore();
  const toggle = (key: string, label: string) => {
    const val = !(settings as any)[key];
    updateSettings({ [key]: val });
    addAuditLog({ admin_id: 'admin', admin_username: adminUsername, action: `Đổi ${label}`, target_type: 'settings', target_id: 'system', details: `${label}: ${val}`, old_value: String(!val), new_value: String(val) });
    toast.success(`${label}: ${val ? 'BẬT' : 'TẮT'}`);
  };
  return (
    <div style={{ maxWidth: '500px' }}>
      {[
        { key: 'deposit_enabled', label: 'Bật nạp tiền', desc: 'Cho phép user nạp tiền' },
        { key: 'deposit_maintenance', label: 'Bảo trì nạp tiền', desc: 'Hiện thông báo bảo trì' },
      ].map(item => (
        <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderRadius: '12px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', marginBottom: '12px' }}>
          <div><div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.label}</div><div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.desc}</div></div>
          <button onClick={() => toggle(item.key, item.label)} style={{
            width: '48px', height: '26px', borderRadius: '13px', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s',
            background: (settings as any)[item.key] ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
          }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '3px', transition: 'left 0.3s', left: (settings as any)[item.key] ? '25px' : '3px' }} />
          </button>
        </div>
      ))}
      <div style={{ padding: '16px 20px', borderRadius: '12px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
        <label style={{ fontWeight: 600, fontSize: '0.95rem', display: 'block', marginBottom: '8px' }}>Thông báo bảo trì</label>
        <input className="input-neon" value={settings.maintenance_message} onChange={e => updateSettings({ maintenance_message: e.target.value })} />
      </div>
    </div>
  );
}

function LogsTab({ logs }: { logs: any[] }) {
  return (
    <div className="table-container">
      <table>
        <thead><tr><th>Thời gian</th><th>Admin</th><th>Hành động</th><th>Chi tiết</th></tr></thead>
        <tbody>
          {logs.map(log => (
            <tr key={log.id}>
              <td style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{formatDate(log.created_at)}</td>
              <td style={{ fontWeight: 600 }}>{log.admin_username}</td>
              <td><span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>{log.action}</span></td>
              <td style={{ fontSize: '0.8rem', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{log.details}</td>
            </tr>
          ))}
          {logs.length === 0 && <tr><td colSpan={4} style={{ textAlign: 'center', padding: '40px', color: 'var(--color-text-muted)' }}>Chưa có nhật ký</td></tr>}
        </tbody>
      </table>
    </div>
  );
}
