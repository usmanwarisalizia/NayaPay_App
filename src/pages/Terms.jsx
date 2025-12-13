import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';

const Terms = () => {
  const { theme } = useTheme();

  return (
    <Layout>
      <div className={`min-h-screen py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms & Conditions</h1>
          <div className="space-y-6 text-lg opacity-75 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Nayapay services, you accept and agree to be bound by
                these Terms and Conditions. If you do not agree, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Account Registration</h2>
              <p>
                You must provide accurate and complete information when creating an account.
                You are responsible for maintaining the security of your account credentials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Use of Services</h2>
              <p>You agree to use our services only for lawful purposes and in accordance
                with these Terms. Prohibited activities include:</p>
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li>Fraudulent transactions</li>
                <li>Money laundering</li>
                <li>Violation of any applicable laws</li>
                <li>Unauthorized access to accounts</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Fees and Charges</h2>
              <p>
                Our fee structure is transparent and available on our Pricing page. You agree
                to pay all applicable fees for services used.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
              <p>
                Nayapay shall not be liable for any indirect, incidental, or consequential
                damages arising from the use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Modifications</h2>
              <p>
                We reserve the right to modify these Terms at any time. Continued use of
                our services after changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Contact</h2>
              <p>
                For questions about these Terms, contact us at legal@nayapay.com
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

export default Terms;

