import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useColorTheme } from '../contexts/ColorThemeContext';
import Layout from '../components/Layout';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedButton from '../components/AnimatedButton';
import AnimatedCard from '../components/AnimatedCard';
import ColorfulBackground from '../components/ColorfulBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FaLock,
  FaBolt,
  FaMoneyBillWave,
  FaMobileAlt,
  FaGlobe,
  FaCreditCard,
} from 'react-icons/fa';


gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { theme } = useTheme();
  const { currentTheme } = useColorTheme();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const featuresRef = useRef(null);
  const valuePropsRef = useRef(null);

  useEffect(() => {
    // Hero section animations
    const tl = gsap.timeline();

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: 'back.out(1.7)',
        },
        '-=0.3'
      );
    }

    // Parallax effect for hero
    if (heroRef.current) {
      gsap.to(heroRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Scroll-triggered animations for value props
    if (valuePropsRef.current) {
      gsap.fromTo(
        valuePropsRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: valuePropsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // Features section animation
    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <Layout>
      <AnimatedPage>
        <ColorfulBackground className={theme === 'dark' ? 'bg-gray-900' : ''}>
          {/* Hero Section with Parallax */}
          <section ref={heroRef} className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
              <div className="text-center">
                <h1
                  ref={titleRef}
                  className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: currentTheme.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Your Digital Wallet, Simplified
                </h1>
                <p
                  ref={subtitleRef}
                  className="text-xl md:text-2xl mb-8 opacity-75 max-w-3xl mx-auto"
                >
                  Send money, pay bills, and manage your finances all in one secure platform.
                  Experience the future of digital payments.
                </p>
                <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
                  <AnimatedButton
                    as={Link}
                    to="/signup"
                    variant="primary"
                    className="text-lg px-8 py-4"
                  >
                    Get Started Free
                  </AnimatedButton>
                  <AnimatedButton
                    as={Link}
                    to="/features"
                    variant="outline"
                    className="text-lg px-8 py-4"
                  >
                    Learn More
                  </AnimatedButton>
                </div>
              </div>

              {/* App Download Links with Animation */}
              <div className="mt-12 flex justify-center gap-4">
                <AnimatedCard delay={0.2} className="inline-block">
                  <a
                    href="#"
                    className={`px-6 py-3 rounded-lg flex items-center gap-2 border transition ${theme === 'dark'
                      ? 'border-gray-700 hover:bg-gray-800'
                      : 'border-gray-300 hover:bg-gray-100'
                      }`}
                  >
                    <span className="text-2xl">📱</span>
                    <div className="text-left">
                      <div className="text-xs opacity-75">Download on the</div>
                      <div className="font-semibold">App Store</div>
                    </div>
                  </a>
                </AnimatedCard>
                <AnimatedCard delay={0.3} className="inline-block">
                  <a
                    href="#"
                    className={`px-6 py-3 rounded-lg flex items-center gap-2 border transition ${theme === 'dark'
                      ? 'border-gray-700 hover:bg-gray-800'
                      : 'border-gray-300 hover:bg-gray-100'
                      }`}
                  >
                    <span className="text-2xl">🤖</span>
                    <div className="text-left">
                      <div className="text-xs opacity-75">Get it on</div>
                      <div className="font-semibold">Google Play</div>
                    </div>
                  </a>
                </AnimatedCard>
              </div>
            </div>
          </section>

          {/* Value Proposition with Scroll Animation */}
          <section className={`py-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Why Choose Nayapay?
              </h2>
              <div ref={valuePropsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <FaLock />,
                    title: 'Bank-Level Security',
                    description: 'Your money and data are protected with end-to-end encryption and advanced security measures.',
                  },
                  {
                    icon: <FaBolt />,
                    title: 'Instant Transfers',
                    description: 'Send and receive money instantly, 24/7. No waiting, no delays.',
                  },
                  {
                    icon: <FaMoneyBillWave />,
                    title: 'Low Fees',
                    description: 'Transparent pricing with minimal fees. Keep more of your money.',
                  },
                  {
                    icon: <FaMobileAlt />,
                    title: 'Easy to Use',
                    description: 'Intuitive interface designed for everyone. Manage finances with ease.',
                  },
                  {
                    icon: <FaGlobe />,
                    title: 'Wide Acceptance',
                    description: 'Accepted at millions of merchants and locations nationwide.',
                  },
                  {
                    icon: <FaCreditCard />,
                    title: 'Virtual Cards',
                    description: 'Get instant virtual cards for online shopping and subscriptions.',
                  },
                ].map((feature, index) => (
                  <AnimatedCard
                    key={index}
                    delay={index * 0.1}
                    className={`p-6 rounded-xl transition relative overflow-hidden group ${theme === 'dark' ? 'bg-gray-700' : 'bg-white shadow-md'
                      }`}
                    style={{
                      border: `2px solid ${currentTheme.primary}20`,
                    }}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        borderColor: currentTheme.primary,
                        boxShadow: `0 10px 30px ${currentTheme.primary}30`,
                        duration: 0.3,
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        borderColor: `${currentTheme.primary}20`,
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        duration: 0.3,
                      });
                    }}
                  >
                    <div
                      className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl"
                      style={{ background: currentTheme.gradient }}
                    />
                    <div className="relative z-10">
                      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="opacity-75">{feature.description}</p>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section ref={featuresRef} className="py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 opacity-75">
                Join thousands of users who trust Nayapay for their daily financial needs.
              </p>
              <AnimatedButton
                as={Link}
                to="/signup"
                variant="primary"
                className="text-lg px-8 py-4"
              >
                Create Free Account
              </AnimatedButton>
            </div>
          </section>
        </ColorfulBackground>
      </AnimatedPage>
    </Layout>
  );
};

export default Home;
