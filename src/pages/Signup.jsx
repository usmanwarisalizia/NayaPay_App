import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      navigate('/verify-otp', { state: { email: formData.email, phone: formData.phone } });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout showNav={false}>
      <div className={`min-h-screen flex items-center justify-center py-12 px-4 ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className={`max-w-md w-full p-8 rounded-2xl shadow-xl ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              N
            </div>
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="opacity-75">Join Nayapay today</p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-blue-500 outline-none`}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-blue-500 outline-none`}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-blue-500 outline-none`}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600'
                    : 'bg-white border-gray-300'
                } focus:ring-2 focus:ring-blue-500 outline-none`}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === 'dark'
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
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="opacity-75 text-sm">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-blue-600 hover:underline">
                Terms & Conditions
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
            <p className="mt-4 opacity-75">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;

