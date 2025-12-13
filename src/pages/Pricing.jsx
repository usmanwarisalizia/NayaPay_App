import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';

const Pricing = () => {
  const { theme } = useTheme();

  const fees = [
    {
      service: 'Send Money',
      fee: 'Free',
      details: 'No fees for sending money to other Nayapay users',
    },
    {
      service: 'Receive Money',
      fee: 'Free',
      details: 'No charges for receiving money',
    },
    {
      service: 'Bank Transfer',
      fee: '₨ 10',
      details: 'Fixed fee per bank transfer',
    },
    {
      service: 'Bill Payments',
      fee: 'Free',
      details: 'No additional charges for utility bill payments',
    },
    {
      service: 'Mobile Recharge',
      fee: 'Free',
      details: 'No service charges',
    },
    {
      service: 'ATM Withdrawal',
      fee: '₨ 25',
      details: 'Per transaction at any ATM',
    },
    {
      service: 'Card Issuance',
      fee: 'Free',
      details: 'Virtual card is free, physical card: ₨ 500',
    },
    {
      service: 'Account Maintenance',
      fee: 'Free',
      details: 'No monthly or annual fees',
    },
  ];

  return (
    <Layout>
      <div className={`min-h-screen py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing & Fees</h1>
            <p className="text-xl opacity-75">
              Transparent pricing with no hidden charges
            </p>
          </div>

          <div className={`rounded-2xl shadow-xl overflow-hidden ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Service Fees</h2>
              <div className="space-y-4">
                {fees.map((item, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border ${
                      theme === 'dark' ? 'border-gray-700 bg-gray-700' : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{item.service}</h3>
                      <span className="text-2xl font-bold text-blue-600">{item.fee}</span>
                    </div>
                    <p className="opacity-75">{item.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`mt-8 p-6 rounded-xl ${
            theme === 'dark' ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50 border border-blue-200'
          }`}>
            <h3 className="text-xl font-bold mb-2">💡 Note</h3>
            <p className="opacity-75">
              All fees are subject to change. We always notify users in advance of any fee changes.
              Some services may have additional charges from third-party providers.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Pricing;

