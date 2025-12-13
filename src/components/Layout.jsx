import { useTheme } from '../contexts/ThemeContext';
import { useColorTheme } from '../contexts/ColorThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ThemeSelector from './ThemeSelector';
import { FaHome, FaWallet, FaClipboardList, FaUser } from 'react-icons/fa';
import { MdHelp, MdAttachMoney, MdStar } from 'react-icons/md';

const Layout = ({ children, showNav = true }) => {
  const { theme, toggleTheme } = useTheme();
  const { currentTheme } = useColorTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!showNav) {
    return <>{children}</>;
  }

  const navItems = isAuthenticated
    ? [
      { path: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
      { path: '/wallet', label: 'Wallet', icon: <FaWallet /> },
      { path: '/transactions', label: 'Transactions', icon: <FaClipboardList /> },
      { path: '/cards', label: 'Cards', icon: '💳' },
      { path: '/profile', label: 'Profile', icon: <FaUser /> },
    ]
    : [
      { path: '/', label: 'Home', icon: <FaHome /> },
      { path: '/features', label: 'Features', icon: <MdStar /> },
      { path: '/pricing', label: 'Pricing', icon: <MdAttachMoney /> },
      { path: '/help', label: 'Help', icon: <MdHelp /> },
      { path: '/blog', label: 'Blog', icon: '📝' },
    ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}>
      <nav className={`sticky top-0 z-50 shadow-lg ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl transition-all transform hover:scale-110"
                style={{ background: currentTheme.gradient }}
              >
                N
              </div>
              <span className="text-xl font-bold">Nayapay</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <ThemeSelector />
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition transform hover:scale-110 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  {user?.role === 'admin' && (
                    <Link
                      to="/admin"
                      className={`px-4 py-2 rounded-lg font-semibold transition ${theme === 'dark'
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${theme === 'dark'
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className={`px-4 py-2 rounded-lg font-semibold transition ${theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-lg font-semibold text-white transition transform hover:scale-105"
                    style={{
                      background: currentTheme.gradient,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = currentTheme.gradientHover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = currentTheme.gradient;
                    }}
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-semibold transition ${theme === 'dark'
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main>{children}</main>

      <footer className={`mt-auto border-t ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              {/* <h3 className="font-bold text-lg mb-4">Nayapay</h3> */}
              <Link to="/" className="flex items-center gap-2">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl transition-all transform hover:scale-110"
                  style={{ background: currentTheme.gradient }}
                >
                  N
                </div>
                <span className="text-xl font-bold">Nayapay</span>
              </Link>

              <p className="text-sm opacity-75 mt-2.5">
                Your trusted digital wallet for seamless financial transactions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="opacity-75 hover:opacity-100">About</Link></li>
                <li><Link to="/careers" className="opacity-75 hover:opacity-100">Careers</Link></li>
                <li><Link to="/blog" className="opacity-75 hover:opacity-100">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/privacy" className="opacity-75 hover:opacity-100">Privacy Policy</Link></li>
                <li><Link to="/terms" className="opacity-75 hover:opacity-100">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/help" className="opacity-75 hover:opacity-100">Help Center</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm opacity-75">
            <p>&copy; 2024 Nayapay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

