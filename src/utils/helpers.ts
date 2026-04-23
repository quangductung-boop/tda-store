// ==========================================
// VALIDATION UTILITIES
// ==========================================

export const validate = {
  username: (value: string): string | null => {
    if (!value.trim()) return 'Tên đăng nhập không được để trống';
    if (value.length < 3) return 'Tên đăng nhập tối thiểu 3 ký tự';
    if (value.length > 20) return 'Tên đăng nhập tối đa 20 ký tự';
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Tên đăng nhập chỉ chứa chữ, số và dấu gạch dưới';
    return null;
  },

  password: (value: string): string | null => {
    if (!value) return 'Mật khẩu không được để trống';
    if (value.length < 6) return 'Mật khẩu tối thiểu 6 ký tự';
    if (value.length > 50) return 'Mật khẩu tối đa 50 ký tự';
    return null;
  },

  email: (value: string): string | null => {
    if (!value) return null; // Email is optional
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email không hợp lệ';
    return null;
  },

  amount: (value: number, min: number = 10000, max: number = 10000000): string | null => {
    if (isNaN(value) || value <= 0) return 'Số tiền không hợp lệ';
    if (value < min) return `Số tiền tối thiểu ${formatCurrency(min)}`;
    if (value > max) return `Số tiền tối đa ${formatCurrency(max)}`;
    return null;
  },
};

// ==========================================
// FORMAT UTILITIES
// ==========================================

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
};

export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('vi-VN').format(num);
};

// ==========================================
// MISC UTILITIES
// ==========================================

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const truncate = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'completed': return 'text-green-400';
    case 'pending': return 'text-yellow-400';
    case 'cancelled':
    case 'failed': return 'text-red-400';
    case 'refunded': return 'text-blue-400';
    default: return 'text-gray-400';
  }
};

export const getStatusText = (status: string): string => {
  switch (status) {
    case 'completed': return 'Hoàn thành';
    case 'pending': return 'Đang xử lý';
    case 'cancelled': return 'Đã hủy';
    case 'failed': return 'Thất bại';
    case 'refunded': return 'Đã hoàn tiền';
    default: return status;
  }
};

export const getTransactionTypeText = (type: string): string => {
  switch (type) {
    case 'deposit': return 'Nạp tiền';
    case 'purchase': return 'Mua hàng';
    case 'refund': return 'Hoàn tiền';
    case 'admin_add': return 'Admin cộng tiền';
    case 'admin_deduct': return 'Admin trừ tiền';
    default: return type;
  }
};
