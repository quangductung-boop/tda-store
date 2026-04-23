import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, Navigate } from 'react-router-dom';
import { User, ShoppingBag, Wallet, Lock, Download, LogOut, Loader2, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { formatCurrency, formatDate, getStatusColor, getStatusText } from '../utils/helpers';
import { content } from '../config/content';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: any) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error: any) { return { hasError: true, error }; }
  componentDidCatch(error: any, errorInfo: any) { console.error("Profile Error:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Đã có lỗi xảy ra khi tải dữ liệu</h2>
          <p className="text-gray-400 mb-6">{String(this.state.error)}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[#00e5ff] text-black rounded font-bold">Tải lại trang</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function Profile() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'profile');
  const { user, profile, loading: authLoading } = useAuth();
  
  const [orders, setOrders] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    setLoadingData(true);
    try {
      const [ordersRes, txRes] = await Promise.all([
        supabase.from('orders').select('*, order_items(*, products(name, image_url))').eq('user_id', user?.id).order('created_at', { ascending: false }),
        supabase.from('transactions').select('*').eq('user_id', user?.id).order('created_at', { ascending: false })
      ]);
      if (ordersRes.data) setOrders(ordersRes.data);
      if (txRes.data) setTransactions(txRes.data);
    } catch (err) {
      console.error('Error fetching user data', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Đã đăng xuất');
    window.location.href = '/login';
  };

  const handleChangePassword = async () => {
    if (newPw !== confirmPw) { toast.error('Mật khẩu xác nhận không khớp'); return; }
    if (newPw.length < 6) { toast.error('Mật khẩu tối thiểu 6 ký tự'); return; }
    
    setUpdating(true);
    const { error } = await supabase.auth.updateUser({ password: newPw });
    setUpdating(false);

    if (error) {
      toast.error('Lỗi: ' + error.message);
    } else {
      toast.success('Đổi mật khẩu thành công!');
      setNewPw(''); setConfirmPw('');
    }
  };

  if (authLoading) return <div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-[#00e5ff]" /></div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const tabs = [
    { id: 'profile', label: content.account.profile, icon: <User size={16} /> },
    { id: 'orders', label: content.account.orders, icon: <ShoppingBag size={16} /> },
    { id: 'transactions', label: content.account.transactions, icon: <Wallet size={16} /> },
    { id: 'password', label: content.account.changePassword, icon: <Lock size={16} /> },
  ];

  return (
    <ErrorBoundary>
    <div className="max-w-5xl mx-auto px-4 py-10 min-h-screen relative overflow-hidden text-white">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7c4dff] rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h1 className="font-orbitron text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#00e5ff] to-[#7c4dff]">
          HỒ SƠ CÁ NHÂN
        </h1>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/30 rounded transition-all">
          <LogOut size={16} /> Đăng xuất
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)} 
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-medium whitespace-nowrap transition-all border ${
              activeTab === tab.id 
                ? 'border-[#00e5ff] bg-[#00e5ff]/10 text-[#00e5ff] shadow-[0_0_15px_rgba(0,229,255,0.2)]' 
                : 'border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-[#0a0e17]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative z-10">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7c4dff] to-[#00e5ff] flex items-center justify-center shadow-[0_0_30px_rgba(124,77,255,0.4)]">
                <User size={36} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-2xl">{profile?.username || user.email?.split('@')[0]}</h3>
                <p className="text-gray-400 text-sm">Người dùng TDA Store</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { label: 'Tên hiển thị', value: profile?.username || user.email?.split('@')[0] },
                { label: 'Email liên kết', value: user.email },
                { label: 'Số dư tín dụng', value: formatCurrency(profile?.balance || 0), highlight: true },
                { label: 'Vai trò', value: profile?.role?.toUpperCase() || 'USER' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:justify-between py-4 border-b border-white/5">
                  <span className="text-gray-400 mb-1 sm:mb-0 uppercase text-xs tracking-wider font-bold">{item.label}</span>
                  <span className={`font-semibold ${item.highlight ? 'text-[#00e5ff] drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]' : 'text-gray-200'}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="animate-fade-in">
            {loadingData ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute inset-0 border-4 border-[#00e5ff]/20 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-[#00e5ff] rounded-full border-t-transparent animate-spin shadow-[0_0_15px_#00e5ff]"></div>
                </div>
                <p className="text-[#00e5ff] font-bold tracking-widest animate-pulse">ĐANG TẢI ĐƠN HÀNG...</p>
              </div>
            ) : 
             orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center hover:border-white/20 transition-colors">
                    <div>
                      <div className="flex gap-3 mb-2">
                        <span className="text-xs font-mono text-gray-500">#{String(order.id).split('-')[0]}</span>
                        <span className="text-xs text-gray-400">{formatDate(order.created_at)}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {order.order_items?.map((item: any, idx: number) => (
                          <div key={idx} className="text-sm">
                            <span className="text-gray-300">{item.products?.name || 'Sản phẩm'}</span>
                            <span className="text-[#00e5ff] ml-2">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-right w-full sm:w-auto flex flex-row sm:flex-col justify-between sm:justify-end items-center sm:items-end">
                      <p className="font-bold text-[#00e5ff] text-lg mb-1">{formatCurrency(order.total_amount)}</p>
                      <span className={`px-3 py-1 rounded text-xs font-bold ${order.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-white/5 rounded-xl border border-white/10">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <h3 className="text-xl font-bold mb-2">Chưa có đơn hàng</h3>
                <p className="text-gray-400 mb-6">Bạn chưa thực hiện giao dịch nào trên hệ thống.</p>
                <Link to="/shop" className="px-6 py-3 bg-gradient-to-r from-[#7c4dff] to-[#00e5ff] rounded font-bold hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all">
                  MUA SẮM NGAY
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === 'transactions' && (
          <div className="animate-fade-in overflow-x-auto">
            {loadingData ? <div className="text-center py-10"><Loader2 className="w-8 h-8 animate-spin text-[#00e5ff] mx-auto" /></div> : 
             transactions.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                    <th className="p-4 font-semibold">Thời gian</th>
                    <th className="p-4 font-semibold">Mô tả</th>
                    <th className="p-4 font-semibold text-right">Số tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-sm text-gray-300">{formatDate(tx.created_at)}</td>
                      <td className="p-4 text-sm text-gray-300">{tx.description}</td>
                      <td className={`p-4 text-right font-bold ${tx.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {tx.amount >= 0 ? '+' : ''}{formatCurrency(Math.abs(tx.amount))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-16 px-4">
                <Wallet className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-gray-400">Không có biến động số dư.</p>
              </div>
            )}
          </div>
        )}

        {/* Change Password Tab */}
        {activeTab === 'password' && (
          <div className="animate-fade-in max-w-md">
            <h3 className="font-bold text-xl mb-6">Đổi mã khóa bảo mật</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Mật khẩu mới</label>
                <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:border-[#00e5ff] focus:outline-none transition-colors" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase">Xác nhận mật khẩu</label>
                <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 focus:border-[#00e5ff] focus:outline-none transition-colors" placeholder="••••••••" />
              </div>
              <button 
                onClick={handleChangePassword} 
                disabled={updating}
                className="w-full mt-2 bg-[#00e5ff] text-black font-bold py-3 rounded-xl hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all flex justify-center items-center gap-2"
              >
                {updating && <Loader2 className="w-4 h-4 animate-spin" />} CẬP NHẬT MÃ KHÓA
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </ErrorBoundary>
  );
}
