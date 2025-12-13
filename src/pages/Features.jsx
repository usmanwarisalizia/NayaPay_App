import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';
import {
  FaMoneyBillWave,
  FaInbox,
  FaQrcode,
  FaSyncAlt,
  FaBolt,
  FaMobileAlt,
  FaWifi,
  FaTv,
  FaCreditCard,
  FaLock,
  FaChartBar,
  FaBell,
  FaShieldAlt,
  FaUserShield,
  FaMobile,
} from 'react-icons/fa';


const Features = () => {
  const { theme } = useTheme();

  const features = [
    {
      category: 'Payments',
      items: [
        { icon: <FaMoneyBillWave />, title: 'Send Money', desc: 'Transfer funds instantly to anyone, anywhere' },
        { icon: <FaInbox />, title: 'Receive Money', desc: 'Get paid directly to your wallet' },
        { icon: <FaQrcode />, title: 'QR Payments', desc: 'Pay at stores using QR codes' },
        { icon: <FaSyncAlt />, title: 'Scheduled Payments', desc: 'Set up recurring and scheduled payments' },
      ],
    },
    {
      category: 'Bill Payments',
      items: [
        { icon: <FaBolt />, title: 'Utility Bills', desc: 'Pay electricity, gas, and water bills' },
        { icon: <FaMobileAlt />, title: 'Mobile Recharge', desc: 'Top up your mobile balance instantly' },
        { icon: <FaWifi />, title: 'Internet Bills', desc: 'Pay for internet and broadband services' },
        { icon: <FaTv />, title: 'Cable TV', desc: 'Manage your cable and streaming subscriptions' },
      ],
    },
    {
      category: 'Cards',
      items: [
        { icon: <FaCreditCard />, title: 'Virtual Cards', desc: 'Instant virtual cards for online shopping' },
        { icon: <FaLock />, title: 'Card Controls', desc: 'Freeze, unfreeze, and manage spending limits' },
        { icon: <FaChartBar />, title: 'Spending Analytics', desc: 'Track and analyze your expenses' },
        { icon: <FaBell />, title: 'Transaction Alerts', desc: 'Real-time notifications for all transactions' },
      ],
    },
    {
      category: 'Security',
      items: [
        { icon: <FaUserShield />, title: '2FA Authentication', desc: 'Two-factor authentication for extra security' },
        { icon: <FaShieldAlt />, title: 'Fraud Detection', desc: 'Advanced fraud detection and prevention' },
        { icon: <FaMobile />, title: 'Device Management', desc: 'Monitor and manage logged-in devices' },
        { icon: <FaLock />, title: 'End-to-End Encryption', desc: 'All data encrypted in transit and at rest' },
      ],
    },
  ];


  return (
    <Layout>
      <div className={`min-h-screen py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Features</h1>
            <p className="text-xl opacity-75">
              Everything you need to manage your finances in one place
            </p>
          </div>

          {features.map((category, catIndex) => (
            <section key={catIndex} className="mb-16">
              <h2 className="text-3xl font-bold mb-8">{category.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`p-6 rounded-xl transition hover:scale-105 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50 shadow-md'
                      }`}
                  >
                    <div
                      className={`text-4xl mb-4 ${theme === 'dark' ? 'text-indigo-400' : 'text-blue-600'
                        }`}
                    >
                      {item.icon}
                    </div>

                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="opacity-75">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Features;

