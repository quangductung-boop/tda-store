// ==================== USER & AUTH ====================
export interface User {
  id: string;
  username: string;
  email?: string;
  balance: number;
  role: 'user' | 'admin';
  is_locked: boolean;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// ==================== PRODUCTS ====================
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  original_price?: number;
  image_url: string;
  category_id: string;
  download_url: string;
  is_active: boolean;
  is_featured: boolean;
  stock: number;
  sold_count: number;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  product_count: number;
}

// ==================== ORDERS ====================
export interface Order {
  id: string;
  user_id: string;
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  total_price: number;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  download_url: string;
  created_at: string;
  updated_at: string;
}

// ==================== TRANSACTIONS ====================
export interface Transaction {
  id: string;
  user_id: string;
  type: 'deposit' | 'purchase' | 'refund' | 'admin_add' | 'admin_deduct';
  amount: number;
  balance_before: number;
  balance_after: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

// ==================== SETTINGS ====================
export interface SystemSettings {
  id: string;
  deposit_enabled: boolean;
  deposit_maintenance: boolean;
  maintenance_message: string;
  site_announcement?: string;
  min_deposit: number;
  max_deposit: number;
  updated_at: string;
}

// ==================== AUDIT LOGS ====================
export interface AuditLog {
  id: string;
  admin_id: string;
  admin_username: string;
  action: string;
  target_type: 'user' | 'product' | 'order' | 'transaction' | 'settings';
  target_id: string;
  details: string;
  old_value?: string;
  new_value?: string;
  created_at: string;
}

// ==================== UI TYPES ====================
export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  avatar: string;
  content: string;
  rating: number;
}
