import { MessageCircle, Mail, PlaySquare, HelpCircle } from 'lucide-react';
import { siteConfig } from '../config/site';
import { content } from '../config/content';

export default function SupportPage() {
  return (
    <div className="section-container" style={{ paddingTop: '40px', paddingBottom: '80px', maxWidth: '800px' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>
        <span className="gradient-text">Hỗ Trợ Khách Hàng</span>
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '40px' }}>Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>

      {/* Contact Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '48px' }}>
        {[
          { icon: <MessageCircle size={24} />, title: 'Zalo', desc: 'Chat trực tiếp', link: siteConfig.contact.zalo, color: '#00e5ff' },
          { icon: <MessageCircle size={24} />, title: 'Discord', desc: 'Tham gia cộng đồng', link: siteConfig.contact.discord, color: '#7c4dff' },
          { icon: <Mail size={24} />, title: 'Email', desc: siteConfig.contact.email, link: `mailto:${siteConfig.contact.email}`, color: '#00e676' },
          { icon: <PlaySquare size={24} />, title: 'TikTok', desc: '@ducanhnbs', link: siteConfig.contact.tiktok, color: '#ff0050' },
        ].map((item, i) => (
          <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" style={{
            padding: '24px', borderRadius: '16px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
            textDecoration: 'none', color: 'inherit', transition: 'all 0.3s', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '12px',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,229,255,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ color: item.color }}>{item.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '1rem' }}>{item.title}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{item.desc}</div>
          </a>
        ))}
      </div>

      {/* FAQ */}
      <h2 style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <HelpCircle size={20} style={{ color: 'var(--color-primary)' }} /> Câu hỏi thường gặp
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {content.faq.items.map((item, i) => (
          <div key={i} style={{ padding: '20px', borderRadius: '14px', background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
            <h4 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '8px', color: 'var(--color-primary)' }}>{item.question}</h4>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.7 }}>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
