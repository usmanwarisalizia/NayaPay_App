import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedButton from '../components/AnimatedButton';
import { gsap } from 'gsap';
import { FaLock, } from 'react-icons/fa';


const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(300); // 5 minutes
  const inputRefs = useRef([]);
  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { email, phone } = location.state || {};

  useEffect(() => {
    // Container animation
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );
    }

    // OTP input animation
    if (inputRefs.current.length > 0) {
      gsap.fromTo(
        inputRefs.current,
        { opacity: 0, scale: 0.8, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.2,
          ease: 'back.out(1.7)',
        }
      );
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Animate timer countdown
  useEffect(() => {
    if (timerRef.current && timer < 60) {
      gsap.to(timerRef.current, {
        scale: 1.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
      // Animate next input
      gsap.to(inputRefs.current[index + 1], {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.some((digit) => !digit)) {
      setError('Please enter the complete OTP');
      return;
    }

    setLoading(true);
    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);

    // Success animation
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        onComplete: () => navigate('/dashboard'),
      });
    } else {
      navigate('/dashboard');
    }
  };

  const resendOTP = () => {
    setTimer(300);
    setOtp(['', '', '', '', '', '']);
    // Resend animation
    if (inputRefs.current[0]) {
      gsap.to(inputRefs.current, {
        opacity: 0.5,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    }
  };

  return (
    <Layout showNav={false}>
      <AnimatedPage>
        <div className={`min-h-screen flex items-center justify-center py-12 px-4 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
          }`}>
          <div
            ref={containerRef}
            className={`max-w-md w-full p-8 rounded-2xl shadow-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }`}
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-linear-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                <FaLock className="text-3xl" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Verify OTP</h1>
              <p className="opacity-75">
                Enter the 6-digit code sent to {email || phone}
              </p>
            </div>

            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-12 h-14 text-center text-2xl font-bold rounded-lg border-2 transition ${theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 focus:border-blue-500'
                        : 'bg-white border-gray-300 focus:border-blue-500'
                      } focus:ring-2 focus:ring-blue-500 outline-none`}
                  />
                ))}
              </div>

              <div className="text-center">
                <p className="text-sm opacity-75 mb-2">
                  Code expires in{' '}
                  <span
                    ref={timerRef}
                    className="font-bold text-blue-600"
                  >
                    {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={resendOTP}
                  disabled={timer > 0}
                  className="text-blue-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Resend OTP
                </button>
              </div>

              <AnimatedButton
                type="submit"
                disabled={loading}
                variant="primary"
                className="w-full"
              >
                {loading ? 'Verifying...' : 'Verify'}
              </AnimatedButton>
            </form>
          </div>
        </div>
      </AnimatedPage>
    </Layout>
  );
};

export default VerifyOTP;
