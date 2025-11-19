import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { items } = useCart();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold">
              WingtipToys
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link to="/" className="hover:bg-blue-700 px-3 py-2 rounded-md">
                Home
              </Link>
              <Link to="/products" className="hover:bg-blue-700 px-3 py-2 rounded-md">
                Products
              </Link>
              <Link to="/about" className="hover:bg-blue-700 px-3 py-2 rounded-md">
                About
              </Link>
              <Link to="/contact" className="hover:bg-blue-700 px-3 py-2 rounded-md">
                Contact
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="hover:bg-blue-700 px-3 py-2 rounded-md relative">
              Cart
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                <span className="text-sm">Hello, {user?.username}</span>
                <button
                  onClick={logout}
                  className="hover:bg-blue-700 px-3 py-2 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:bg-blue-700 px-3 py-2 rounded-md">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-md"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
