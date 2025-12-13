import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';

const About = () => {
  const { theme } = useTheme();

  return (
    <Layout>
      <div className={`min-h-screen py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">About Nayapay</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg opacity-75 leading-relaxed">
                To democratize financial services and make digital payments accessible to everyone.
                We believe that managing money should be simple, secure, and available to all,
                regardless of their location or financial background.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-lg opacity-75 leading-relaxed">
                To become the leading digital wallet platform in the region, empowering millions
                of users to take control of their finances and participate in the digital economy.
                We envision a future where cashless transactions are the norm, and financial
                inclusion is a reality for all.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Company Overview</h2>
              <p className="text-lg opacity-75 leading-relaxed mb-4">
                Nayapay was founded with a simple goal: to make financial services more accessible
                and user-friendly. Since our inception, we've been committed to innovation,
                security, and customer satisfaction.
              </p>
              <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className="text-xl font-bold mb-4">Key Highlights</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Licensed and regulated financial services provider</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Bank-level security and encryption</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>24/7 customer support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span>Millions of satisfied users</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Security First', desc: 'Your safety is our top priority' },
                  { title: 'Innovation', desc: 'Constantly improving our platform' },
                  { title: 'Transparency', desc: 'Clear and honest communication' },
                  { title: 'Accessibility', desc: 'Financial services for everyone' },
                ].map((value, i) => (
                  <div
                    key={i}
                    className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}
                  >
                    <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                    <p className="opacity-75">{value.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;

