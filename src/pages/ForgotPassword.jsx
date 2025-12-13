import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';
import { FaKey, FaEnvelope } from 'react-icons/fa';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <Layout showNav={false}>
      <div className={`min-h-screen flex items-center justify-center py-12 px-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
        <div className={`max-w-md w-full p-8 rounded-2xl shadow-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white mx-auto mb-4">
              <FaKey className="text-3xl" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
            <p className="opacity-75">
              Enter your email to receive a password reset link
            </p>
          </div>

          {success ? (
            <div className="text-center">
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                Password reset link has been sent to your email!
              </div>
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline"
              >
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark'
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 outline-none`}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>

              <div className="text-center">
                <Link to="/login" className="text-blue-600 hover:underline">
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;

