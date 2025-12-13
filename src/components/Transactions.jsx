import { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Layout from './Layout';
import ProtectedRoute from './ProtectedRoute';

const Transactions = () => {
  const { theme } = useTheme();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      // const data = await walletAPI.getTransactions();
      
      // Mock data
      const mockTransactions = [
        { id: 1, type: 'sent', amount: 500, description: 'Payment to John Doe', date: '2024-01-15', status: 'completed' },
        { id: 2, type: 'received', amount: 1000, description: 'Payment from Sarah Smith', date: '2024-01-14', status: 'completed' },
        { id: 3, type: 'sent', amount: 250, description: 'Grocery payment', date: '2024-01-13', status: 'completed' },
        { id: 4, type: 'sent', amount: 1500, description: 'Electricity bill', date: '2024-01-12', status: 'pending' },
        { id: 5, type: 'received', amount: 2000, description: 'Salary credit', date: '2024-01-10', status: 'completed' },
        { id: 6, type: 'sent', amount: 300, description: 'Mobile recharge', date: '2024-01-09', status: 'completed' },
      ];
      
      setTransactions(mockTransactions);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.type === filter);

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      failed: 'bg-red-100 text-red-700',
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || styles.pending}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Transactions</h1>
              <p className="opacity-75">View all your payment history</p>
            </div>

            {/* Filter Buttons */}
            <div className={`rounded-xl shadow-md p-4 mb-6 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="flex gap-2 flex-wrap">
                {['all', 'sent', 'received'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      filter === f
                        ? 'bg-blue-600 text-white'
                        : theme === 'dark'
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Transactions List */}
            <div className={`rounded-2xl shadow-lg p-6 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              {filteredTransactions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="opacity-75 text-lg">No transactions found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className={`flex items-center justify-between p-4 rounded-lg transition border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${
                            transaction.type === 'sent'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-green-100 text-green-600'
                          }`}
                        >
                          {transaction.type === 'sent' ? '📤' : '📥'}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold">{transaction.description}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <p className="text-sm opacity-75">{transaction.date}</p>
                            {getStatusBadge(transaction.status)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            transaction.type === 'sent' ? 'text-red-600' : 'text-green-600'
                          }`}
                        >
                          {transaction.type === 'sent' ? '-' : '+'}₨ {transaction.amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Transactions;

