import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { formatCurrency } from '../../utils/helpers';
import { content } from '../../config/content';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const hasDiscount = product.original_price && product.original_price > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.original_price! - product.price) / product.original_price!) * 100)
    : 0;

  return (
    <Link to={`/product/${product.slug}`} className="card" style={{
      display: 'flex',
      flexDirection: 'column',
      textDecoration: 'none',
      color: 'inherit',
      height: '100%',
    }}>
      {/* Image */}
      <div className="product-image-wrapper">
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
        />
        {/* Discount badge */}
        {hasDiscount && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '4px 10px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #ff4081, #ff1744)',
            color: '#fff',
            fontSize: '0.75rem',
            fontWeight: 700,
            zIndex: 2,
          }}>
            -{discountPercent}%
          </div>
        )}
        {/* Tags */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          display: 'flex',
          gap: '6px',
          zIndex: 2,
          flexWrap: 'wrap',
        }}>
          {product.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      {/* Info */}
      <div style={{
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flex: 1,
      }}>
        <h3 style={{
          fontWeight: 700,
          fontSize: '1rem',
          color: 'var(--color-text-primary)',
          lineHeight: 1.3,
        }}>
          {product.name}
        </h3>

        <p style={{
          fontSize: '0.8rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.5,
          flex: 1,
        }}>
          {product.short_description}
        </p>

        {/* Price + sold */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '4px',
        }}>
          <div>
            <span style={{
              fontWeight: 800,
              fontSize: '1.1rem',
              color: 'var(--color-primary)',
            }}>
              {formatCurrency(product.price)}
            </span>
            {hasDiscount && (
              <span style={{
                fontSize: '0.8rem',
                color: 'var(--color-text-muted)',
                textDecoration: 'line-through',
                marginLeft: '8px',
              }}>
                {formatCurrency(product.original_price!)}
              </span>
            )}
          </div>
          <span style={{
            fontSize: '0.7rem',
            color: 'var(--color-text-muted)',
          }}>
            {product.sold_count} {content.product.sold}
          </span>
        </div>

        {/* Buy button */}
        <button className="btn-neon" style={{
          width: '100%',
          padding: '10px',
          fontSize: '0.85rem',
          marginTop: '4px',
        }}>
          <ShoppingCart size={15} />
          {content.product.buyNow}
        </button>
      </div>
    </Link>
  );
}
