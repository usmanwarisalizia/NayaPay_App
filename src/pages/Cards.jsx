import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import AnimatedPage from '../components/AnimatedPage';
import { gsap } from 'gsap';

const Cards = () => {
  const { theme } = useTheme();
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'virtual',
      number: '**** **** **** 1234',
      name: 'John Doe',
      expiry: '12/25',
      frozen: false,
      balance: 5000,
    },
  ]);
  const cardRefs = useRef([]);

  // 3D Flip Animation
  const handleCardFlip = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const isFlipped = card.dataset.flipped === 'true';
    
    gsap.to(card, {
      rotationY: isFlipped ? 0 : 180,
      duration: 0.6,
      ease: 'power2.inOut',
      transformStyle: 'preserve-3d',
    });

    card.dataset.flipped = isFlipped ? 'false' : 'true';
  };

  // Animate cards on mount
  useEffect(() => {
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.8, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
          }
        );
      }
    });
  }, []);

  const toggleFreeze = (cardId) => {
    setCards(cards.map(card => {
      if (card.id === cardId) {
        // Animate freeze toggle
        const cardElement = cardRefs.current[cards.indexOf(card)];
        if (cardElement) {
          gsap.to(cardElement, {
            scale: 0.95,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut',
          });
        }
        return { ...card, frozen: !card.frozen };
      }
      return card;
    }));
  };

  return (
    <ProtectedRoute>
      <Layout>
        <AnimatedPage>
          <div className={`min-h-screen py-8 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Cards</h1>
                <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition transform hover:scale-105">
                  + Request New Card
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    ref={(el) => (cardRefs.current[index] = el)}
                    data-flipped="false"
                    className="relative"
                    style={{ perspective: '1000px' }}
                  >
                    <div
                      className={`relative rounded-2xl p-6 text-white overflow-hidden cursor-pointer transition-all ${
                        card.frozen ? 'opacity-60' : ''
                      }`}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        transformStyle: 'preserve-3d',
                      }}
                      onClick={() => handleCardFlip(index)}
                      onMouseEnter={(e) => {
                        if (!card.frozen) {
                          gsap.to(e.currentTarget, {
                            scale: 1.02,
                            y: -5,
                            duration: 0.3,
                            ease: 'power2.out',
                          });
                        }
                      }}
                      onMouseLeave={(e) => {
                        gsap.to(e.currentTarget, {
                          scale: 1,
                          y: 0,
                          duration: 0.3,
                          ease: 'power2.out',
                        });
                      }}
                    >
                      {card.frozen && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                          <span className="text-2xl font-bold">FROZEN</span>
                        </div>
                      )}
                      <div className="relative z-0">
                        <div className="flex justify-between items-start mb-8">
                          <div>
                            <p className="text-sm opacity-75">Card Balance</p>
                            <p className="text-2xl font-bold">Rs {card.balance.toLocaleString()}</p>
                          </div>
                          <span className="text-3xl">💳</span>
                        </div>
                        <div className="mb-4">
                          <p className="text-xl font-mono mb-2">{card.number}</p>
                          <div className="flex justify-between text-sm">
                            <span>{card.name}</span>
                            <span>{card.expiry}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFreeze(card.id);
                            }}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                              card.frozen
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'bg-white/20 hover:bg-white/30'
                            }`}
                          >
                            {card.frozen ? 'Unfreeze' : 'Freeze'}
                          </button>
                          <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-semibold transition">
                            Settings
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`rounded-2xl shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-2xl font-bold mb-6">Card Controls</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Spending Limit</p>
                      <p className="text-sm opacity-75">Daily transaction limit</p>
                    </div>
                    <input
                      type="number"
                      defaultValue="50000"
                      className={`w-32 px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600'
                          : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">ATM Withdrawal Limit</p>
                      <p className="text-sm opacity-75">Daily ATM withdrawal limit</p>
                    </div>
                    <input
                      type="number"
                      defaultValue="25000"
                      className={`w-32 px-4 py-2 rounded-lg border ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600'
                          : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedPage>
      </Layout>
    </ProtectedRoute>
  );
};

export default Cards;
