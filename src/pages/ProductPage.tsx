import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingCart, Download, Shield, Zap, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import { useProductStore } from '../stores/appStore';
import { useAuthStore, useOrderStore, useTransactionStore } from '../stores/authStore';
import { content } from '../config/content';
import { formatCurrency } from '../utils/helpers';
import { categories } from '../data/categories';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const getBySlug = useProductStore((s) => s.getBySlug);
  const incrementSold = useProductStore((s) => s.incrementSold);
  const { user, isAuthenticated, updateBalance } = useAuthStore();
  const addOrder = useOrderStore((s) => s.addOrder);
  const addTransaction = useTransactionStore((s) => s.addTransaction);
  const product = getBySlug(slug || '');

  if (!product) {
    return (
      <div className="section-container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '4rem' }}>😕</div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Không tìm thấy sản phẩm</h2>
        <Link to="/shop" className="btn-neon">Về cửa hàng</Link>
      </div>
    );
  }

  const category = categories.find((c) => c.id === product.category_id);
  const hasDiscount = product.original_price && product.original_price > product.price;

  const handleBuy = () => {
    if (!isAuthenticated || !user) { toast.error('Vui lòng đăng nhập để mua hàng'); navigate('/login'); return; }
    if (user.balance < product.price) { toast.error(content.product.insufficientBalance); return; }
    if (product.stock <= 0) { toast.error(content.product.outOfStock); return; }

    updateBalance(user.id, -product.price);
    addOrder({ user_id: user.id, product_id: product.id, product_name: product.name, product_image: product.image_url, quantity: 1, total_price: product.price, status: 'completed', download_url: product.download_url });
    addTransaction({ user_id: user.id, type: 'purchase', amount: -product.price, balance_before: user.balance, balance_after: user.balance - product.price, description: `Mua ${product.name}`, status: 'completed' });
    incrementSold(product.id);
    toast.success(content.product.purchaseSuccess);
  };

  return (
    <div className="section-container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Trang chủ</Link><span>/</span>
        <Link to="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>Cửa hàng</Link><span>/</span>
        <span style={{ color: 'var(--color-primary)' }}>{product.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
        {/* Image */}
        <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--color-border)', position: 'relative' }}>
          <img src={product.image_url} alt={product.name} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover' }} />
          {hasDiscount && (
            <div style={{ position: 'absolute', top: '16px', right: '16px', padding: '6px 14px', borderRadius: '10px', background: 'linear-gradient(135deg, #ff4081, #ff1744)', color: '#fff', fontSize: '0.85rem', fontWeight: 700 }}>
              -{Math.round(((product.original_price! - product.price) / product.original_price!) * 100)}%
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {category && <div className="badge badge-cyan" style={{ marginBottom: '12px' }}>{category.icon} {category.name}</div>}
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '16px' }}>{product.name}</h1>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {product.tags.map((tag) => (<span key={tag} className="tag">{tag}</span>))}
          </div>

          <div style={{ padding: '20px', borderRadius: '14px', background: 'rgba(0, 229, 255, 0.04)', border: '1px solid rgba(0, 229, 255, 0.15)', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>{formatCurrency(product.price)}</span>
              {hasDiscount && <span style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>{formatCurrency(product.original_price!)}</span>}
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              <span>📦 Còn {product.stock}</span><span>🔥 {product.sold_count} đã bán</span>
            </div>
          </div>

          <button onClick={handleBuy} className="btn-neon" style={{ width: '100%', padding: '16px', fontSize: '1.05rem', marginBottom: '16px' }} disabled={product.stock <= 0}>
            <ShoppingCart size={20} />{product.stock <= 0 ? content.product.outOfStock : content.product.buyNow}
          </button>

          {!isAuthenticated && <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}><Link to="/login" style={{ color: 'var(--color-primary)', textDecoration: 'none' }}>{content.product.loginToBuy}</Link></p>}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '24px' }}>
            {[{ icon: <Shield size={16}/>, text: 'An toàn & bảo mật' }, { icon: <Zap size={16}/>, text: 'Nhận ngay tức thì' }, { icon: <Download size={16}/>, text: 'Link tải vĩnh viễn' }, { icon: <Tag size={16}/>, text: 'Giá tốt nhất' }].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', borderRadius: '10px', background: 'rgba(0,229,255,0.03)', border: '1px solid rgba(0,229,255,0.08)', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                <span style={{ color: 'var(--color-primary)' }}>{f.icon}</span>{f.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <div style={{ padding: '28px', borderRadius: '18px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', marginTop: '40px' }}>
        <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '16px' }}>{content.product.description}</h3>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{product.description}</p>
        <div style={{ marginTop: '24px', padding: '16px', borderRadius: '12px', background: 'rgba(0,229,255,0.04)', border: '1px solid rgba(0,229,255,0.1)' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}><Download size={16} style={{ color: 'var(--color-primary)' }} />{content.product.downloadAfterPurchase}</p>
        </div>
      </div>
    </div>
  );
}
