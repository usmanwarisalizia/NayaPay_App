import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedButton from '../components/AnimatedButton';
import { gsap } from 'gsap';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const logoRef = useRef(null);
  const errorRef = useRef(null);

  useEffect(() => {
    // Logo animation
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' }
      );
    }

    // Form animation
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' }
      );
    }
  }, []);

  // Error animation
  useEffect(() => {
    if (error && errorRef.current) {
      gsap.fromTo(
        errorRef.current,
        { opacity: 0, x: -20, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
      );
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      // Success animation
      if (formRef.current) {
        gsap.to(formRef.current, {
          scale: 0.95,
          opacity: 0,
          duration: 0.3,
          onComplete: () => navigate('/dashboard'),
        });
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <Layout showNav={false}>
      <AnimatedPage>
        <div className={`min-h-screen flex items-center justify-center py-12 px-4 ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <div className={`max-w-md w-full p-8 rounded-2xl shadow-xl ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="text-center mb-8">
              <div
                ref={logoRef}
                className="w-16 h-16 bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4"
              >
                N
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="opacity-75">Sign in to your Nayapay account</p>
            </div>

            {error && (
              <div
                ref={errorRef}
                className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
              >
                {error}
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold mb-2">Email or Phone</label>
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border transition ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 focus:border-blue-500'
                      : 'bg-white border-gray-300 focus:border-blue-500'
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
                  className={`w-full px-4 py-3 rounded-lg border transition ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 focus:border-blue-500'
                      : 'bg-white border-gray-300 focus:border-blue-500'
                  } focus:ring-2 focus:ring-blue-500 outline-none`}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <AnimatedButton
                type="submit"
                disabled={loading}
                variant="primary"
                className="w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </AnimatedButton>
            </form>

            <div className="mt-6 text-center">
              <p className="opacity-75">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </AnimatedPage>
    </Layout>
  );
};

export default Login;
