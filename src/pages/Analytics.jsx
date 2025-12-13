import { useState, } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

const Analytics = () => {
  const { theme } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const spendingData = {
    month: [
      { category: 'Food & Dining', amount: 15000, percentage: 35 },
      { category: 'Shopping', amount: 8000, percentage: 18 },
      { category: 'Bills', amount: 12000, percentage: 28 },
      { category: 'Transport', amount: 5000, percentage: 12 },
      { category: 'Entertainment', amount: 3000, percentage: 7 },
    ],
  };

  const currentData = spendingData[selectedPeriod] || spendingData.month;
  const total = currentData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <ProtectedRoute>
      <Layout>
        <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">Expense Analytics</h1>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className={`px-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-600'
                    : 'bg-white border-gray-300'
                }`}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
                <p className="text-sm opacity-75 mb-2">Total Spending</p>
                <p className="text-3xl font-bold">₨ {total.toLocaleString()}</p>
              </div>
              <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
                <p className="text-sm opacity-75 mb-2">Transactions</p>
                <p className="text-3xl font-bold">42</p>
              </div>
              <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
                <p className="text-sm opacity-75 mb-2">Average per Transaction</p>
                <p className="text-3xl font-bold">₨ {Math.round(total / 42).toLocaleString()}</p>
              </div>
            </div>

            <div className={`rounded-2xl shadow-lg p-6 mb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-2xl font-bold mb-6">Spending by Category</h2>
              <div className="space-y-4">
                {currentData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{item.category}</span>
                      <span className="font-bold">₨ {item.amount.toLocaleString()}</span>
                    </div>
                    <div className={`h-3 rounded-full overflow-hidden ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div
                        className="h-full bg-linear-to-r from-blue-600 to-indigo-600 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <p className="text-sm opacity-75 mt-1">{item.percentage}% of total</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-2xl shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-2xl font-bold mb-6">Monthly Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm opacity-75 mb-2">Income</p>
                  <p className="text-2xl font-bold text-green-600">₨ 50,000</p>
                </div>
                <div>
                  <p className="text-sm opacity-75 mb-2">Expenses</p>
                  <p className="text-2xl font-bold text-red-600">₨ {total.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm opacity-75 mb-2">Savings</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ₨ {(50000 - total).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-75 mb-2">Savings Rate</p>
                  <p className="text-2xl font-bold">
                    {Math.round(((50000 - total) / 50000) * 100)}%
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

export default Analytics;

