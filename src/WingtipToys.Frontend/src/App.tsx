import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/about"
                  element={
                    <div className="max-w-7xl mx-auto px-4 py-8">
                      <h1 className="text-3xl font-bold mb-4">About Us</h1>
                      <p className="text-gray-600">
                        WingtipToys is your premier destination for quality toys.
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <div className="max-w-7xl mx-auto px-4 py-8">
                      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
                      <p className="text-gray-600">
                        Get in touch with us for any questions or concerns.
                      </p>
                    </div>
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <div className="max-w-7xl mx-auto px-4 py-8">
                      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
                      <p className="text-gray-600">Your cart is empty.</p>
                    </div>
                  }
                />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

