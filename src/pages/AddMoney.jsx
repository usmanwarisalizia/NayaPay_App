import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useWallet } from '../contexts/WalletContext';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

const AddMoney = () => {
  const { theme } = useTheme();
  const { addMoney } = useWallet();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    paymentMethod: 'bank',
    bankAccount: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (formData.paymentMethod === 'bank' && !formData.bankAccount) {
      setError('Please enter bank account number');
      return;
    }

    try {
      setLoading(true);
      // Simulate API call
      // await walletAPI.addMoney(parseFloat(formData.amount), formData.paymentMethod);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Update balance
      addMoney(formData.amount);
      
      setLoading(false);
      setSuccess(true);
      setFormData({ amount: '', paymentMethod: 'bank', bankAccount: '' });
      setTimeout(() => navigate('/wallet'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to add money. Please try again.');
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`rounded-2xl shadow-xl p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h1 className="text-3xl font-bold mb-6">Add Money</h1>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  Money added successfully! Redirecting...
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2">Amount (PKR)</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 outline-none`}
                    placeholder="0.00"
                    min="100"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Payment Method</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 outline-none`}
                  >
                    <option value="bank">Bank Transfer</option>
                    <option value="card">Debit/Credit Card</option>
                    <option value="easypaisa">Easypaisa</option>
                    <option value="jazzcash">JazzCash</option>
                  </select>
                </div>

                {formData.paymentMethod === 'bank' && (
                  <div>
                    <label className="block font-semibold mb-2">Bank Account</label>
                    <input
                      type="text"
                      value={formData.bankAccount}
                      onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600'
                          : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 outline-none`}
                      placeholder="Enter bank account number"
                      required
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || success}
                  className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Add Money'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default AddMoney;

