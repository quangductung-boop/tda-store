import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Transaction, Order } from '../types';
import { generateId } from '../utils/helpers';

// ==========================================
// AUTH STORE — Quản lý trạng thái đăng nhập
// Khi kết nối Supabase, thay logic bằng supabase.auth
// ==========================================

interface AuthStore {
  user: User | null;
  users: User[];
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, email?: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateBalance: (userId: string, amount: number) => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<{ success: boolean; message: string }>;
  getUserById: (id: string) => User | undefined;
  toggleLockUser: (userId: string) => void;
  getAllUsers: () => User[];
}

// Lưu mật khẩu tạm ở local (khi có Supabase sẽ dùng Auth)
const passwordStore: Record<string, string> = {};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      isLoading: false,
      isAuthenticated: false,

      login: async (username: string, password: string) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 500)); // Simulate network

        const users = get().users;
        const user = users.find((u) => u.username === username);

        if (!user) {
          set({ isLoading: false });
          return false;
        }

        if (user.is_locked) {
          set({ isLoading: false });
          return false;
        }

        // Check password
        if (passwordStore[user.id] !== password) {
          set({ isLoading: false });
          return false;
        }

        set({ user, isAuthenticated: true, isLoading: false });
        return true;
      },

      register: async (username: string, password: string, email?: string) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 500));

        const users = get().users;
        if (users.some((u) => u.username === username)) {
          set({ isLoading: false });
          return { success: false, message: 'Tên đăng nhập đã tồn tại' };
        }

        const newUser: User = {
          id: generateId(),
          username,
          email: email || undefined,
          balance: 0,
          role: 'user',
          is_locked: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        passwordStore[newUser.id] = password;

        set((state) => ({
          users: [...state.users, newUser],
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        }));

        return { success: true, message: 'Đăng ký thành công!' };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateBalance: (userId: string, amount: number) => {
        set((state) => ({
          users: state.users.map((u) =>
            u.id === userId ? { ...u, balance: u.balance + amount, updated_at: new Date().toISOString() } : u
          ),
          user: state.user?.id === userId
            ? { ...state.user, balance: state.user.balance + amount, updated_at: new Date().toISOString() }
            : state.user,
        }));
      },

      changePassword: async (oldPassword: string, newPassword: string) => {
        const user = get().user;
        if (!user) return { success: false, message: 'Chưa đăng nhập' };

        if (passwordStore[user.id] !== oldPassword) {
          return { success: false, message: 'Mật khẩu cũ không đúng' };
        }

        passwordStore[user.id] = newPassword;
        return { success: true, message: 'Đổi mật khẩu thành công!' };
      },

      getUserById: (id: string) => {
        return get().users.find((u) => u.id === id);
      },

      toggleLockUser: (userId: string) => {
        set((state) => ({
          users: state.users.map((u) =>
            u.id === userId ? { ...u, is_locked: !u.is_locked, updated_at: new Date().toISOString() } : u
          ),
        }));
      },

      getAllUsers: () => get().users,
    }),
    {
      name: 'tda-auth-store',
      partialize: (state) => ({
        users: state.users,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// ==========================================
// TRANSACTION STORE
// ==========================================
interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id' | 'created_at'>) => Transaction;
  getByUserId: (userId: string) => Transaction[];
  getAll: () => Transaction[];
  updateStatus: (txId: string, status: Transaction['status']) => void;
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      transactions: [],

      addTransaction: (tx) => {
        const newTx: Transaction = {
          ...tx,
          id: generateId(),
          created_at: new Date().toISOString(),
        };
        set((state) => ({ transactions: [newTx, ...state.transactions] }));
        return newTx;
      },

      getByUserId: (userId: string) => {
        return get().transactions.filter((t) => t.user_id === userId);
      },

      getAll: () => get().transactions,

      updateStatus: (txId: string, status: Transaction['status']) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === txId ? { ...t, status } : t
          ),
        }));
      },
    }),
    { name: 'tda-transaction-store' }
  )
);

// ==========================================
// ORDER STORE
// ==========================================
interface OrderStore {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'created_at' | 'updated_at'>) => Order;
  getByUserId: (userId: string) => Order[];
  getAll: () => Order[];
  updateStatus: (orderId: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],

      addOrder: (order) => {
        const newOrder: Order = {
          ...order,
          id: generateId(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        set((state) => ({ orders: [newOrder, ...state.orders] }));
        return newOrder;
      },

      getByUserId: (userId: string) => {
        return get().orders.filter((o) => o.user_id === userId);
      },

      getAll: () => get().orders,

      updateStatus: (orderId: string, status: Order['status']) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status, updated_at: new Date().toISOString() } : o
          ),
        }));
      },
    }),
    { name: 'tda-order-store' }
  )
);
