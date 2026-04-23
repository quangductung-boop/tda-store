import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { content } from '../../config/content';
import ProductCard from '../product/ProductCard';
import { useProductStore } from '../../stores/appStore';

export default function FeaturedSection() {
  const getFeatured = useProductStore((s) => s.getFeatured);
  const featured = getFeatured();

  if (featured.length === 0) return null;

  return (
    <section className="section-padding" style={{ background: 'var(--color-bg-primary)' }}>
      <div className="section-container">
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          marginBottom: '48px', flexWrap: 'wrap', gap: '16px',
        }}>
          <div>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '8px' }}>
              {content.featured.title}
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
              {content.featured.subtitle}
            </p>
          </div>
          <Link to="/shop" className="btn-ghost" style={{
            color: 'var(--color-primary)', gap: '6px',
          }}>
            {content.featured.viewAll} <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px',
        }}>
          {featured.slice(0, 4).map((product, i) => (
            <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
