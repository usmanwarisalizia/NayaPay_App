import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import {
  FaBolt,
  FaFire,
  FaTint,
  FaWifi,
  FaTv,
} from 'react-icons/fa';


const Bills = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('electricity');

  const categories = [
    { id: 'electricity', name: 'Electricity', icon: <FaBolt /> },
    { id: 'gas', name: 'Gas', icon: <FaFire /> },
    { id: 'water', name: 'Water', icon: <FaTint /> },
    { id: 'internet', name: 'Internet', icon: <FaWifi /> },
    { id: 'cable', name: 'Cable TV', icon: <FaTv /> },
  ];


  const [formData, setFormData] = useState({
    accountNumber: '',
    amount: '',
    dueDate: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle bill payment
    alert('Bill payment initiated!');
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">Pay Bills</h1>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-6 rounded-xl transition ${selectedCategory === cat.id
                      ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white'
                      : theme === 'dark'
                        ? 'bg-gray-800'
                        : 'bg-white shadow-md'
                    }`}
                >
                  <div className="text-4xl mb-2">{cat.icon}</div>
                  <div className="font-semibold">{cat.name}</div>
                </button>
              ))}
            </div>

            <div className={`rounded-2xl shadow-xl p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-2xl font-bold mb-6">
                Pay {categories.find(c => c.id === selectedCategory)?.name} Bill
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2">Account Number</label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 outline-none`}
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Amount (PKR)</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 outline-none`}
                    min="1"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Due Date</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600'
                        : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 outline-none`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition"
                >
                  Pay Bill
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Bills;

