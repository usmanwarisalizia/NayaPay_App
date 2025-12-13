import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';

const Careers = () => {
  const { theme } = useTheme();

  const positions = [
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Karachi, Pakistan',
      type: 'Full-time',
    },
    {
      title: 'Backend Engineer',
      department: 'Engineering',
      location: 'Lahore, Pakistan',
      type: 'Full-time',
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
    },
    {
      title: 'Security Analyst',
      department: 'Security',
      location: 'Islamabad, Pakistan',
      type: 'Full-time',
    },
    {
      title: 'Customer Support Specialist',
      department: 'Support',
      location: 'Karachi, Pakistan',
      type: 'Full-time',
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Lahore, Pakistan',
      type: 'Full-time',
    },
  ];

  return (
    <Layout>
      <div className={`min-h-screen py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Careers</h1>
            <p className="text-xl opacity-75">
              Join us in building the future of digital payments
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Why Work at Nayapay?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '🚀', title: 'Innovation', desc: 'Work on cutting-edge fintech solutions' },
                { icon: '👥', title: 'Great Team', desc: 'Collaborate with talented professionals' },
                { icon: '📈', title: 'Growth', desc: 'Opportunities for career advancement' },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="opacity-75">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Open Positions</h2>
            <div className="space-y-4">
              {positions.map((position, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-gray-50 border-gray-200'
                  } hover:shadow-lg transition`}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{position.title}</h3>
                      <div className="flex flex-wrap gap-3 text-sm opacity-75">
                        <span>{position.department}</span>
                        <span>•</span>
                        <span>{position.location}</span>
                        <span>•</span>
                        <span>{position.type}</span>
                      </div>
                    </div>
                    <button className="px-6 py-2 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Careers;

