import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product, SystemSettings, AuditLog } from '../types';
import { products as defaultProducts } from '../data/products';
import { generateId } from '../utils/helpers';

// ==========================================
// PRODUCT STORE
// ==========================================
interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getById: (id: string) => Product | undefined;
  getBySlug: (slug: string) => Product | undefined;
  getByCategory: (categoryId: string) => Product[];
  getFeatured: () => Product[];
  search: (query: string) => Product[];
  incrementSold: (id: string) => void;
}

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: defaultProducts,

      setProducts: (products) => set({ products }),

      addProduct: (product) => {
        const newProduct: Product = {
          ...product,
          id: generateId(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        set((state) => ({ products: [...state.products, newProduct] }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        }));
      },

      getById: (id) => get().products.find((p) => p.id === id),
      getBySlug: (slug) => get().products.find((p) => p.slug === slug),
      getByCategory: (categoryId) => get().products.filter((p) => p.category_id === categoryId && p.is_active),
      getFeatured: () => get().products.filter((p) => p.is_featured && p.is_active),

      search: (query) => {
        const lower = query.toLowerCase();
        return get().products.filter(
          (p) =>
            p.is_active &&
            (p.name.toLowerCase().includes(lower) ||
              p.short_description.toLowerCase().includes(lower) ||
              p.tags.some((t) => t.toLowerCase().includes(lower)))
        );
      },

      incrementSold: (id) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id
              ? { ...p, sold_count: p.sold_count + 1, stock: Math.max(0, p.stock - 1) }
              : p
          ),
        }));
      },
    }),
    { name: 'tda-product-store' }
  )
);

// ==========================================
// SETTINGS STORE
// ==========================================
interface SettingsStore {
  settings: SystemSettings;
  updateSettings: (updates: Partial<SystemSettings>) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: {
        id: 'system-settings',
        deposit_enabled: true,
        deposit_maintenance: false,
        maintenance_message: 'Hệ thống nạp đang bảo trì, xin lỗi quý khách.',
        site_announcement: '',
        min_deposit: 10000,
        max_deposit: 10000000,
        updated_at: new Date().toISOString(),
      },

      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates, updated_at: new Date().toISOString() },
        }));
      },
    }),
    { name: 'tda-settings-store' }
  )
);

// ==========================================
// ADMIN STORE
// ==========================================
interface AdminStore {
  isAdminLoggedIn: boolean;
  adminUsername: string;
  auditLogs: AuditLog[];
  showAdminPanel: boolean;
  
  loginAdmin: (username: string, password: string) => boolean;
  logoutAdmin: () => void;
  toggleAdminPanel: () => void;
  setShowAdminPanel: (show: boolean) => void;
  addAuditLog: (log: Omit<AuditLog, 'id' | 'created_at'>) => void;
  getAuditLogs: () => AuditLog[];
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      isAdminLoggedIn: false,
      adminUsername: '',
      auditLogs: [],
      showAdminPanel: false,

      loginAdmin: (username: string, password: string) => {
        // Admin credentials from config — in production, validate via Supabase
        if (username === 'admin' && password === '123456') {
          set({ isAdminLoggedIn: true, adminUsername: username });
          return true;
        }
        return false;
      },

      logoutAdmin: () => {
        set({ isAdminLoggedIn: false, adminUsername: '', showAdminPanel: false });
      },

      toggleAdminPanel: () => {
        set((state) => ({ showAdminPanel: !state.showAdminPanel }));
      },

      setShowAdminPanel: (show: boolean) => {
        set({ showAdminPanel: show });
      },

      addAuditLog: (log) => {
        const newLog: AuditLog = {
          ...log,
          id: generateId(),
          created_at: new Date().toISOString(),
        };
        set((state) => ({ auditLogs: [newLog, ...state.auditLogs] }));
      },

      getAuditLogs: () => get().auditLogs,
    }),
    {
      name: 'tda-admin-store',
      partialize: (state) => ({
        auditLogs: state.auditLogs,
        isAdminLoggedIn: state.isAdminLoggedIn,
        adminUsername: state.adminUsername,
      }),
    }
  )
);
