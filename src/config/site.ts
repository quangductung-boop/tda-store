// ==========================================
// SITE CONFIGURATION — Thay đổi thông tin shop tại đây
// ==========================================

export const siteConfig = {
  // Tên shop
  name: 'TDA Store',
  nameWithIcon: 'TDA Store⚡️',
  tagline: 'Shop Game Uy Tín #1',
  description: 'Mua game bản quyền giá tốt nhất, giao dịch an toàn, hỗ trợ 24/7',

  // Thông tin liên hệ — thay link thật vào đây
  contact: {
    zalo: 'https://zalo.me/g/rocnjmwzn8hqvxdfhizj',
    tiktok: 'https://tiktok.com/@ducanhnbs',
    facebook: 'https://facebook.com/tdastore',
    discord: 'https://discord.gg/ahEDAhYxZb',
    email: 'quangductung@gmail.com',
  },

  // SEO
  seo: {
    title: 'TDA Store⚡️ - Shop Game Uy Tín #1 Việt Nam',
    description: 'Mua game bản quyền giá tốt nhất. Giao dịch an toàn, hỗ trợ 24/7, nạp tiền siêu tốc.',
    keywords: 'game, shop game, mua game, game bản quyền, TDA Store',
    ogImage: '/og-image.png',
  },

  // Các badge hiển thị trên hero
  badges: [
    { text: '✓ Verified Seller', color: 'cyan' },
    { text: 'Since 2026', color: 'purple' },
    { text: '⚡ Giao dịch tức thì', color: 'green' },
  ],

  // Footer
  footer: {
    copyright: '© 2026 TDA Store⚡️. All rights reserved.',
    links: [
      { label: 'Chính sách bảo mật', path: '/policy' },
      { label: 'Điều khoản sử dụng', path: '/terms' },
      { label: 'Liên hệ', path: '/support' },
    ],
  },

  // Admin credentials mặc định — PHẢI đổi khi deploy
  defaultAdmin: {
    username: 'admin',
    password: 'admin123',
  },
};
