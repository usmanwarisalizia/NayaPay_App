import { useEffect, useRef } from 'react';
import { useColorTheme } from '../contexts/ColorThemeContext';
import { gsap } from 'gsap';

const ColorfulBackground = ({ children, className = '' }) => {
  const { currentTheme } = useColorTheme();
  const bgRef = useRef(null);

  useEffect(() => {
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        background: `radial-gradient(circle at 20% 50%, ${currentTheme.primary}15 0%, transparent 50%),
                     radial-gradient(circle at 80% 80%, ${currentTheme.secondary}15 0%, transparent 50%),
                     radial-gradient(circle at 40% 20%, ${currentTheme.accent}15 0%, transparent 50%)`,
        duration: 1,
        ease: 'power2.inOut',
      });
    }
  }, [currentTheme]);

  return (
    <div
      ref={bgRef}
      className={`relative min-h-screen ${className}`}
      style={{
        background: `radial-gradient(circle at 20% 50%, ${currentTheme.primary}15 0%, transparent 50%),
                     radial-gradient(circle at 80% 80%, ${currentTheme.secondary}15 0%, transparent 50%),
                     radial-gradient(circle at 40% 20%, ${currentTheme.accent}15 0%, transparent 50%)`,
      }}
    >
      {/* Animated floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: currentTheme.gradient,
            top: '10%',
            left: '10%',
            animation: 'float 20s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: currentTheme.gradientHover,
            bottom: '10%',
            right: '10%',
            animation: 'float 25s ease-in-out infinite reverse',
          }}
        />
      </div>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(50px, -50px) scale(1.1);
          }
        }
      `}</style>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ColorfulBackground;

