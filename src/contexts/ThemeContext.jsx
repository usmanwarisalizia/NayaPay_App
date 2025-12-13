import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ThemeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });
  const bodyRef = useRef(document.body);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Smooth theme transition animation
    gsap.to(bodyRef.current, {
      opacity: 0.7,
      duration: 0.2,
      ease: 'power2.inOut',
      onComplete: () => {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        gsap.to(bodyRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.inOut',
        });
      },
    });
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

