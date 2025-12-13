import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';

const Blog = () => {
  const { theme } = useTheme();

  const posts = [
    {
      title: '5 Tips for Secure Digital Payments',
      date: 'January 15, 2024',
      excerpt: 'Learn how to keep your digital wallet secure and protect yourself from fraud.',
      category: 'Security',
    },
    {
      title: 'Understanding KYC: Why It Matters',
      date: 'January 10, 2024',
      excerpt: 'Everything you need to know about KYC verification and why it\'s important for your account.',
      category: 'Education',
    },
    {
      title: 'New Feature: Scheduled Payments',
      date: 'January 5, 2024',
      excerpt: 'Never miss a payment again with our new scheduled payments feature.',
      category: 'Updates',
    },
    {
      title: 'How to Maximize Your Digital Wallet',
      date: 'December 28, 2023',
      excerpt: 'Tips and tricks to get the most out of your Nayapay wallet.',
      category: 'Tips',
    },
  ];

  return (
    <Layout>
      <div className={`min-h-screen py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Updates</h1>
            <p className="text-xl opacity-75">
              Stay updated with the latest news, tips, and features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <article
                key={index}
                className={`rounded-xl overflow-hidden transition hover:scale-105 ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50 shadow-md'
                }`}
              >
                <div className="p-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                    theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {post.category}
                  </span>
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-sm opacity-75 mb-4">{post.date}</p>
                  <p className="opacity-75 mb-4">{post.excerpt}</p>
                  <button className="text-blue-600 font-semibold hover:underline">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;

