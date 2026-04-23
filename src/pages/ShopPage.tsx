import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useProductStore } from '../stores/appStore';
import { categories } from '../data/categories';
import { content } from '../config/content';
import ProductCard from '../components/product/ProductCard';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'popular';

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useProductStore((s) => s.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  
  const selectedCategory = searchParams.get('category') || 'all';

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => p.is_active);

    // Category filter
    if (selectedCategory !== 'all') {
      const cat = categories.find((c) => c.slug === selectedCategory);
      if (cat) result = result.filter((p) => p.category_id === cat.id);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.short_description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.sold_count - a.sold_count);
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="section-container" style={{ paddingTop: '40px', paddingBottom: '80px', minHeight: '70vh' }}>
      {/* Header */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          fontWeight: 800,
          marginBottom: '8px',
        }}>
          <span className="gradient-text">Cửa Hàng</span>
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Khám phá kho game chất lượng cao
        </p>
      </div>

      {/* Filters Bar */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '32px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
        {/* Search */}
        <div style={{
          flex: '1 1 300px',
          position: 'relative',
        }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--color-text-muted)',
          }} />
          <input
            type="text"
            placeholder={content.common.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-neon"
            style={{ paddingLeft: '42px' }}
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="input-neon"
          style={{
            width: 'auto',
            minWidth: '160px',
            cursor: 'pointer',
            appearance: 'auto',
          }}
        >
          <option value="popular">Phổ biến nhất</option>
          <option value="newest">Mới nhất</option>
          <option value="price-asc">Giá thấp → cao</option>
          <option value="price-desc">Giá cao → thấp</option>
        </select>
      </div>

      {/* Category tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '32px',
        overflowX: 'auto',
        paddingBottom: '8px',
      }}>
        <button
          onClick={() => setSearchParams({})}
          style={{
            padding: '8px 18px',
            borderRadius: '10px',
            border: '1px solid',
            borderColor: selectedCategory === 'all' ? 'var(--color-primary)' : 'var(--color-border)',
            background: selectedCategory === 'all' ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
            color: selectedCategory === 'all' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            transition: 'all 0.3s',
            fontFamily: 'var(--font-body)',
          }}
        >
          {content.common.all}
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSearchParams({ category: cat.slug })}
            style={{
              padding: '8px 18px',
              borderRadius: '10px',
              border: '1px solid',
              borderColor: selectedCategory === cat.slug ? 'var(--color-primary)' : 'var(--color-border)',
              background: selectedCategory === cat.slug ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
              color: selectedCategory === cat.slug ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              transition: 'all 0.3s',
              fontFamily: 'var(--font-body)',
            }}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {filteredProducts.map((product, i) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms`, opacity: 0 }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          color: 'var(--color-text-muted)',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>
            Không tìm thấy sản phẩm
          </p>
          <p style={{ fontSize: '0.875rem' }}>
            Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
          </p>
        </div>
      )}
    </div>
  );
}
