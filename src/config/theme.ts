// ==========================================
// THEME CONFIGURATION — Đổi màu sắc, gradient tại đây
// ==========================================

export const themeConfig = {
  colors: {
    // Màu chủ đạo
    primary: '#00e5ff',       // Cyan chính
    primaryDark: '#00b8d4',
    primaryLight: '#18ffff',
    
    // Accent
    accent: '#7c4dff',        // Purple accent
    accentLight: '#b388ff',
    
    // Neon glow
    neonCyan: '#00e5ff',
    neonPurple: '#7c4dff',
    neonPink: '#ff4081',
    neonGreen: '#00e676',
    neonBlue: '#2979ff',
    
    // Background
    bgPrimary: '#0a0e17',     // Nền chính gần đen
    bgSecondary: '#111827',
    bgCard: '#1a1f2e',
    bgCardHover: '#242938',
    bgGlass: 'rgba(17, 24, 39, 0.8)',
    
    // Text
    textPrimary: '#f0f6fc',
    textSecondary: '#8b949e',
    textMuted: '#6e7681',
    
    // Status
    success: '#00e676',
    warning: '#ffc107',
    error: '#ff5252',
    info: '#2196f3',
    
    // Borders
    border: 'rgba(0, 229, 255, 0.15)',
    borderHover: 'rgba(0, 229, 255, 0.4)',
  },

  gradients: {
    primary: 'linear-gradient(135deg, #00e5ff 0%, #0091ea 100%)',
    hero: 'linear-gradient(135deg, rgba(0, 229, 255, 0.15) 0%, rgba(124, 77, 255, 0.1) 100%)',
    card: 'linear-gradient(145deg, rgba(26, 31, 46, 0.9) 0%, rgba(15, 20, 35, 0.95) 100%)',
    neonBorder: 'linear-gradient(90deg, #00e5ff, #7c4dff, #00e5ff)',
    glass: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
    darkOverlay: 'linear-gradient(180deg, rgba(10,14,23,0.3) 0%, rgba(10,14,23,0.95) 100%)',
  },

  shadows: {
    neonCyan: '0 0 20px rgba(0, 229, 255, 0.3), 0 0 40px rgba(0, 229, 255, 0.1)',
    neonPurple: '0 0 20px rgba(124, 77, 255, 0.3), 0 0 40px rgba(124, 77, 255, 0.1)',
    card: '0 4px 24px rgba(0, 0, 0, 0.4)',
    cardHover: '0 8px 40px rgba(0, 229, 255, 0.15)',
    glass: '0 8px 32px rgba(0, 0, 0, 0.3)',
  },

  // Wallpaper hero — thay URL ảnh anime vào đây (vd: ảnh Gojo)
  heroWallpaper: '',  // Để trống = dùng gradient. Thay bằng URL ảnh để hiện wallpaper

  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },

  animation: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
};
