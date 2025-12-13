import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaComments,
  FaPlus,
  FaMinus,
  FaUser,
} from 'react-icons/fa';


const Help = () => {
  const { theme } = useTheme();
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Click on "Sign Up" and provide your email, phone number, and create a password. You\'ll receive an OTP for verification.',
    },
    {
      question: 'Is Nayapay safe to use?',
      answer: 'Yes, we use bank-level encryption and security measures. All transactions are protected with end-to-end encryption.',
    },
    {
      question: 'How do I add money to my wallet?',
      answer: 'You can add money through bank transfer, debit/credit card, or by linking your bank account. Go to Wallet > Add Money.',
    },
    {
      question: 'What are the transaction limits?',
      answer: 'Transaction limits vary based on your KYC verification status. Basic accounts have lower limits, while verified accounts have higher limits.',
    },
    {
      question: 'How do I verify my account (KYC)?',
      answer: 'Go to Profile > KYC Verification and upload your CNIC and a selfie. Our team will review and verify within 24-48 hours.',
    },
    {
      question: 'Can I freeze my card?',
      answer: 'Yes, you can freeze or unfreeze your card anytime from the Cards section in your dashboard.',
    },
    {
      question: 'How do I reset my password?',
      answer: 'Click on "Forgot Password" on the login page, enter your email, and follow the instructions sent to your email.',
    },
    {
      question: 'What should I do if I notice a suspicious transaction?',
      answer: 'Immediately freeze your card and contact our support team. We have 24/7 fraud detection and will investigate the issue.',
    },
  ];

  return (
    <Layout>
      <div className={`min-h-screen py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Help & Support</h1>
            <p className="text-xl opacity-75">
              We're here to help you with any questions
            </p>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: <FaEnvelope />, title: 'Email', value: 'support@nayapay.com' },
              { icon: <FaPhoneAlt />, title: 'Phone', value: '+92 300 1234567' },
              { icon: <FaComments />, title: 'Live Chat', value: 'Available 24/7' },
            ].map((contact, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                  }`}
              >
                <div className="text-4xl mb-4">{contact.icon}</div>
                <h3 className="font-bold mb-2">{contact.title}</h3>
                <p className="opacity-75">{contact.value}</p>
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`rounded-xl overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
                    }`}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center"
                  >
                    <span className="font-semibold text-lg">{faq.question}</span>
                    <span className="text-2xl">{openFaq === index ? '−' : '+'}</span>
                  </button>
                  {openFaq === index && (
                    <div className={`px-6 pb-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                      <p className="opacity-75">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h2 className="text-2xl font-bold mb-6">Still need help? Contact us</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Name</label>
                <input
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark'
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 outline-none`}
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark'
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 outline-none`}
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Message</label>
                <textarea
                  rows="4"
                  className={`w-full px-4 py-3 rounded-lg border ${theme === 'dark'
                      ? 'bg-gray-700 border-gray-600'
                      : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-500 outline-none resize-none`}
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Help;

