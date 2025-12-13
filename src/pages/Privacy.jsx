import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';

const Privacy = () => {
  const { theme } = useTheme();

  return (
    <Layout>
      <div className={`min-h-screen py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-lg opacity-75 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p>
                At Nayapay, we are committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when you
                use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <p>
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Personal identification information (name, email, phone number)</li>
                <li>Financial information (bank account details, transaction history)</li>
                <li>Identity verification documents (CNIC, selfie for KYC)</li>
                <li>Device information and usage data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Provide and maintain our services</li>
                <li>Process transactions and payments</li>
                <li>Verify your identity and prevent fraud</li>
                <li>Send you important updates and notifications</li>
                <li>Improve our services and user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p>
                We implement industry-standard security measures including encryption,
                secure servers, and access controls to protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at
                privacy@nayapay.com
              </p>
            </section>

            <p className="text-sm mt-8 opacity-50">
              Last updated: January 2024
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;

