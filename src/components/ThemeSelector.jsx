import { useEffect, useRef } from 'react';
import { useColorTheme } from '../contexts/ColorThemeContext';
import { gsap } from 'gsap';

const ThemeSelector = () => {
  const {
    colorTheme,
    setColorTheme,
    colorThemes,
    showThemeSelector,
    toggleThemeSelector,
  } = useColorTheme();
  const selectorRef = useRef(null);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (showThemeSelector && selectorRef.current) {
      gsap.fromTo(
        selectorRef.current,
        { opacity: 0, scale: 0.8, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.7)' }
      );
    }
  }, [showThemeSelector]);

  // Close selector when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        showThemeSelector
      ) {
        toggleThemeSelector();
      }
    };

    if (showThemeSelector) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showThemeSelector, toggleThemeSelector]);

  const handleThemeChange = (themeKey) => {
    setColorTheme(themeKey);
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.2,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    }
    // Close selector after theme change
    setTimeout(() => {
      toggleThemeSelector();
    }, 300);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        onClick={toggleThemeSelector}
        className="p-2 rounded-lg text-white transition transform hover:scale-110"
        style={{
          background: `var(--gradient-primary)`,
        }}
        title="Change Theme"
      >
        <span className="text-xl">🎨</span>
      </button>

      {showThemeSelector && (
        <div
          ref={selectorRef}
          className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 z-50 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Choose Theme</h3>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(colorThemes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => handleThemeChange(key)}
                className={`p-3 rounded-lg transition-all transform hover:scale-105 ${
                  colorTheme === key
                    ? 'ring-2 ring-offset-2 ring-blue-500 scale-105'
                    : 'hover:ring-2 hover:ring-offset-2 hover:ring-gray-300'
                }`}
                style={{
                  background: theme.gradient,
                  color: 'white',
                }}
              >
                <div className="text-xs font-semibold">{theme.name}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;

