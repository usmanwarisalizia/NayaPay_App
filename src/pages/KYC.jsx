import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import {
  FaCheckCircle,
  FaHourglassHalf,
} from 'react-icons/fa';


const KYC = () => {
  const { theme } = useTheme();
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    cnic: '',
    cnicFront: null,
    cnicBack: null,
    selfie: null,
  });
  const [status, setStatus] = useState(user?.kycVerified ? 'verified' : 'pending');

  const handleFileChange = (field, file) => {
    setFormData({ ...formData, [field]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate KYC submission
    setStatus('under_review');
    setUser({ ...user, kycStatus: 'under_review' });
    alert('KYC documents submitted! Review will take 24-48 hours.');
  };

  if (status === 'verified') {
    return (
      <ProtectedRoute>
        <Layout>
          <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`rounded-2xl shadow-xl p-8 text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-6xl mb-4 text-green-500">
                  <FaCheckCircle />
                </div>
                <h1 className="text-3xl font-bold mb-4">KYC Verified</h1>
                <p className="opacity-75">Your account has been successfully verified!</p>
              </div>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  if (status === 'under_review') {
    return (
      <ProtectedRoute>
        <Layout>
          <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`rounded-2xl shadow-xl p-8 text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="text-6xl mb-4 text-yellow-500">
                  <FaHourglassHalf />
                </div>
                <h1 className="text-3xl font-bold mb-4">Under Review</h1>
                <p className="opacity-75">Your KYC documents are being reviewed. This usually takes 24-48 hours.</p>
              </div>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`rounded-2xl shadow-xl p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
              <h1 className="text-3xl font-bold mb-6">KYC Verification</h1>
              <p className="opacity-75 mb-8">
                Complete your KYC verification to unlock higher transaction limits and full account features.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2">CNIC Number</label>
                  <input
                    type="text"
                    value={formData.cnic}
                    onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
                    className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark'
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 outline-none`}
                    placeholder="12345-1234567-1"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">CNIC Front</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange('cnicFront', e.target.files[0])}
                    className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark'
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 outline-none`}
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">CNIC Back</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange('cnicBack', e.target.files[0])}
                    className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark'
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 outline-none`}
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2">Selfie with CNIC</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange('selfie', e.target.files[0])}
                    className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark'
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 outline-none`}
                    required
                  />
                  <p className="text-sm opacity-75 mt-2">
                    Take a clear selfie holding your CNIC next to your face
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition"
                >
                  Submit for Verification
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default KYC;

