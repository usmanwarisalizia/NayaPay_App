import { useState, } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

const Admin = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = {
    totalUsers: 125000,
    activeUsers: 45000,
    pendingKYC: 1250,
    totalTransactions: 2500000,
    revenue: 1250000,
  };

  const pendingKYCs = [
    { id: 1, name: 'John Doe', email: 'john@example.com', submitted: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', submitted: '2024-01-14' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', submitted: '2024-01-13' },
  ];

  const recentTransactions = [
    { id: 1, user: 'User 1', amount: 5000, type: 'sent', status: 'completed', date: '2024-01-15' },
    { id: 2, user: 'User 2', amount: 3000, type: 'received', status: 'completed', date: '2024-01-15' },
    { id: 3, user: 'User 3', amount: 10000, type: 'sent', status: 'pending', date: '2024-01-14' },
  ];

  return (
    <ProtectedRoute adminOnly>
      <Layout>
        <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              {Object.entries(stats).map(([key, value]) => (
                <div
                  key={key}
                  className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'}`}
                >
                  <p className="text-sm opacity-75 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-2xl font-bold">
                    {typeof value === 'number' && value > 1000
                      ? (value / 1000).toFixed(1) + 'K'
                      : value.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b">
              {['dashboard', 'kyc', 'transactions', 'users', 'content'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-semibold transition ${
                    activeTab === tab
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'opacity-75 hover:opacity-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'dashboard' && (
              <div className={`rounded-2xl shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-6">Overview</h2>
                <p className="opacity-75">Dashboard overview content goes here</p>
              </div>
            )}

            {activeTab === 'kyc' && (
              <div className={`rounded-2xl shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-6">Pending KYC Verifications</h2>
                <div className="space-y-4">
                  {pendingKYCs.map((kyc) => (
                    <div
                      key={kyc.id}
                      className={`p-4 rounded-lg flex justify-between items-center ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                      }`}
                    >
                      <div>
                        <p className="font-semibold">{kyc.name}</p>
                        <p className="text-sm opacity-75">{kyc.email}</p>
                        <p className="text-xs opacity-50">Submitted: {kyc.submitted}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                          Approve
                        </button>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                          Reject
                        </button>
                        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className={`rounded-2xl shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-6">Recent Transactions</h2>
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className={`p-4 rounded-lg flex justify-between items-center ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
                      }`}
                    >
                      <div>
                        <p className="font-semibold">{tx.user}</p>
                        <p className="text-sm opacity-75">
                          {tx.type} • {tx.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">₨ {tx.amount.toLocaleString()}</p>
                        <span className={`text-xs px-2 py-1 rounded ${
                          tx.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className={`rounded-2xl shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-6">User Management</h2>
                <p className="opacity-75">User management interface goes here</p>
              </div>
            )}

            {activeTab === 'content' && (
              <div className={`rounded-2xl shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-6">Content Management</h2>
                <p className="opacity-75">Content management interface goes here</p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Admin;

