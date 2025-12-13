import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

const SendMoney = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    recipientId: '',
    amount: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!formData.recipientId || !formData.amount) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      // await walletAPI.sendMoney(formData.recipientId, parseFloat(formData.amount), formData.description);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => navigate('/wallet'), 2000);
    } catch (err) {
      setError(err.message || 'Failed to send money');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`rounded-2xl shadow-xl p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h1 className="text-3xl font-bold mb-6">Send Money</h1>

              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                  Money sent successfully! Redirecting...
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2">Recipient ID / Phone</label>
                  <input
                    type="text"
                    value={formData.recipientId}
                    onChange={(e) => setFormData({ ...formData, recipientId: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 outline-none`}
                    placeholder="Enter recipient ID or phone number"
                    required
                  />
                </div>

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
                    min="1"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Description (Optional)</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 outline-none resize-none`}
                    rows="3"
                    placeholder="Add a note for this transaction"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || success}
                  className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Money'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default SendMoney;

