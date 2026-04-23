import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useAdminStore, useProductStore } from './stores/appStore';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import WalletPage from './pages/WalletPage';
import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SupportPage from './pages/SupportPage';

// Auth & Protection
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Admin
import AdminPanel from './components/admin/AdminPanel';

function App() {
  const { setShowAdminPanel, showAdminPanel, isAdminLoggedIn } = useAdminStore();
  const fetchProducts = useProductStore((s) => s.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Ctrl + Shift + A to toggle admin panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAdminPanel(true);
      }
      if (e.key === 'Escape' && showAdminPanel) {
        if (!isAdminLoggedIn) {
          setShowAdminPanel(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setShowAdminPanel, showAdminPanel, isAdminLoggedIn]);

  return (
    <AuthProvider>
      <div className="page-container">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1a1f2e',
            color: '#f0f6fc',
            border: '1px solid rgba(0, 229, 255, 0.2)',
            borderRadius: '12px',
            fontSize: '0.9rem',
          },
          success: {
            iconTheme: { primary: '#00e676', secondary: '#0a0e17' },
          },
          error: {
            iconTheme: { primary: '#ff5252', secondary: '#0a0e17' },
          },
        }}
      />

      {/* Admin Panel Overlay */}
      {showAdminPanel && <AdminPanel />}

      <Navbar />

      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/support" element={<SupportPage />} />
          
          <Route path="/admin" element={<AdminPanel />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/account" element={<Profile />} />
            <Route path="/orders" element={<Navigate to="/account?tab=orders" replace />} />
          </Route>
        </Routes>
      </main>

      <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
