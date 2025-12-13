import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { FaMobile } from 'react-icons/fa';

const ReceiveMoney = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQrCode(`nayapay://receive/${user?.id || 'user123'}`);
    }, 0);
    return () => clearTimeout(timeout);
  }, [user]);


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`rounded-2xl shadow-xl p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h1 className="text-3xl font-bold mb-6">Receive Money</h1>

              <div className="space-y-6">
                {/* QR Code */}
                <div className="text-center">
                  <div className={`inline-block p-6 rounded-xl ${theme === 'dark' ? 'bg-white' : 'bg-gray-100'
                    }`}>
                    <div className="w-64 h-64 bg-white p-4 rounded-lg mx-auto">
                      <div className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-2"><FaMobile /></div>
                          <p className="text-sm opacity-75">QR Code</p>
                          <p className="text-xs mt-2 opacity-50">{qrCode}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 opacity-75">Scan this QR code to receive money</p>
                </div>

                {/* Account Details */}
                <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h2 className="font-bold mb-4">Your Account Details</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="opacity-75">Account ID:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">{user?.id || 'USER123456'}</span>
                        <button
                          onClick={() => copyToClipboard(user?.id || 'USER123456')}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-75">Phone:</span>
                      <div className="flex items-center gap-2">
                        <span>{user?.phone || '+92 300 1234567'}</span>
                        <button
                          onClick={() => copyToClipboard(user?.phone || '+92 300 1234567')}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="opacity-75">Email:</span>
                      <div className="flex items-center gap-2">
                        <span>{user?.email || 'user@example.com'}</span>
                        <button
                          onClick={() => copyToClipboard(user?.email || 'user@example.com')}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
                  }`}>
                  <p className="text-sm opacity-75">
                    💡 Share your account ID or phone number with others to receive money instantly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default ReceiveMoney;

