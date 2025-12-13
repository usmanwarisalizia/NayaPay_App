import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useColorTheme } from '../contexts/ColorThemeContext';
import { useWallet } from '../contexts/WalletContext';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedCard from '../components/AnimatedCard';
import { gsap } from 'gsap';
import {
  FaPaperPlane,
  FaDownload,
  FaPlusCircle,
  FaFileInvoice,
  FaMobileAlt,
  FaChartBar,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';


const Wallet = () => {
  const { theme } = useTheme();
  const { currentTheme } = useColorTheme();
  const { balance } = useWallet();
  const [displayBalance, setDisplayBalance] = useState(0);
  const balanceRef = useRef(null);
  const transactionsRef = useRef(null);
  const quickActionsRef = useRef(null);

  // Animate balance counter
  useEffect(() => {
    if (balanceRef.current) {
      const obj = { value: displayBalance };
      gsap.to(obj, {
        value: balance,
        duration: 1.5,
        ease: 'power2.out',
        onUpdate: () => {
          setDisplayBalance(obj.value);
        },
      });
    }
  }, [balance]);

  // Animate transactions on mount
  useEffect(() => {
    if (transactionsRef.current) {
      gsap.fromTo(
        transactionsRef.current.children,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3,
        }
      );
    }
  }, []);

  // Animate quick actions
  useEffect(() => {
    if (quickActionsRef.current) {
      gsap.fromTo(
        quickActionsRef.current.children,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          delay: 0.2,
        }
      );
    }
  }, []);

  const quickActions = [
    { icon: FaPaperPlane, label: 'Send Money', path: '/send-money' },
    { icon: FaDownload, label: 'Receive', path: '/receive-money' },
    { icon: FaPlusCircle, label: 'Add Money', path: '/add-money' },
    { icon: FaFileInvoice, label: 'Pay Bills', path: '/bills' },
    { icon: FaMobileAlt, label: 'Recharge', path: '/recharge' },
    { icon: FaChartBar, label: 'Analytics', path: '/analytics' },
  ];


  return (
    <ProtectedRoute>
      <Layout>
        <AnimatedPage>
          <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold mb-8">Wallet</h1>

              {/* Balance Card with Colorful Gradient */}
              <AnimatedCard delay={0} className="mb-8">
                <div
                  className="rounded-2xl shadow-xl p-8 text-white relative overflow-hidden"
                  style={{ background: currentTheme.gradient }}
                >
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                  </div>
                  <div className="relative z-10">
                    <p className="text-white/80 text-sm mb-2">Available Balance</p>
                    <h2 ref={balanceRef} className="text-5xl font-bold mb-4">
                      Rs {displayBalance.toLocaleString('en-PK', { minimumFractionDigits: 2 })}
                    </h2>
                    <div className="flex gap-4">
                      <Link
                        to="/add-money"
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition transform hover:scale-105"
                      >
                        Add Money
                      </Link>
                      <Link
                        to="/transactions"
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg transition transform hover:scale-105"
                      >
                        View Transactions
                      </Link>
                    </div>
                  </div>
                </div>
              </AnimatedCard>

              {/* Quick Actions with Colorful Cards */}
              <div ref={quickActionsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {quickActions.map((action) => (
                  <Link
                    key={action.path}
                    to={action.path}
                    className="group relative overflow-hidden rounded-xl p-6 text-center transition-all transform hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${currentTheme.primary}15 0%, ${currentTheme.secondary}15 100%)`,
                      border: `2px solid ${currentTheme.primary}30`,
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        background: `linear-gradient(135deg, ${currentTheme.primary}25 0%, ${currentTheme.secondary}25 100%)`,
                        borderColor: currentTheme.primary,
                        duration: 0.3,
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        background: `linear-gradient(135deg, ${currentTheme.primary}15 0%, ${currentTheme.secondary}15 100%)`,
                        borderColor: `${currentTheme.primary}30`,
                        duration: 0.3,
                      });
                    }}
                  >
                    <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform">
                      <action.icon style={{ color: currentTheme.primary }} />
                    </div>

                    <div className="font-semibold text-sm" style={{ color: currentTheme.text }}>
                      {action.label}
                    </div>
                  </Link>
                ))}
              </div>

              {/* Recent Transactions with Colorful Accents */}
              <AnimatedCard delay={0.4}>
                <div className={`rounded-2xl shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Recent Transactions</h2>
                    <Link
                      to="/transactions"
                      className="font-semibold transition transform hover:scale-105"
                      style={{ color: currentTheme.primary }}
                    >
                      View All
                    </Link>
                  </div>
                  <div ref={transactionsRef} className="space-y-4">
                    {[
                      { type: 'sent', amount: 500, desc: 'Payment to John', date: 'Today' },
                      { type: 'received', amount: 1000, desc: 'Payment from Sarah', date: 'Yesterday' },
                      { type: 'sent', amount: 250, desc: 'Bill Payment', date: '2 days ago' },
                    ].map((tx, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between p-4 rounded-lg transition ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                          }`}
                        style={{
                          borderLeft: `4px solid ${tx.type === 'sent' ? '#ef4444' : currentTheme.primary}`,
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.type === 'sent'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-green-100 text-green-600'
                              }`}
                          >
                            {tx.type === 'sent' ? <FaArrowUp /> : <FaArrowDown />}
                          </div>
                          <div>
                            <p className="font-semibold">{tx.desc}</p>
                            <p className="text-sm opacity-75">{tx.date}</p>
                          </div>
                        </div>
                        <p className={`font-bold ${tx.type === 'sent' ? 'text-red-600' : 'text-green-600'
                          }`}>
                          {tx.type === 'sent' ? '-' : '+'}Rs {tx.amount.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </AnimatedPage>
      </Layout>
    </ProtectedRoute>
  );
};

export default Wallet;
