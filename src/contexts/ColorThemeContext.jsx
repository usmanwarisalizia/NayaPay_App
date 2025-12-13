import { createContext, useContext, useState, useEffect } from 'react';
import { gsap } from 'gsap';

const ColorThemeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useColorTheme = () => {
  const context = useContext(ColorThemeContext);
  if (!context) {
    throw new Error('useColorTheme must be used within ColorThemeProvider');
  }
  return context;
};

// Colorful theme presets
const colorThemes = {
  ocean: {
    name: 'Ocean Blue',
    primary: '#0ea5e9',
    secondary: '#06b6d4',
    accent: '#3b82f6',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #3b82f6 100%)',
    gradientHover: 'linear-gradient(135deg, #0284c7 0%, #0891b2 50%, #2563eb 100%)',
    bg: '#f0f9ff',
    card: '#ffffff',
    text: '#0c4a6e',
  },
  sunset: {
    name: 'Sunset Orange',
    primary: '#f97316',
    secondary: '#fb923c',
    accent: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #f59e0b 100%)',
    gradientHover: 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #d97706 100%)',
    bg: '#fff7ed',
    card: '#ffffff',
    text: '#9a3412',
  },
  forest: {
    name: 'Forest Green',
    primary: '#10b981',
    secondary: '#34d399',
    accent: '#22c55e',
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #22c55e 100%)',
    gradientHover: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #16a34a 100%)',
    bg: '#f0fdf4',
    card: '#ffffff',
    text: '#14532d',
  },
  purple: {
    name: 'Purple Dream',
    primary: '#a855f7',
    secondary: '#c084fc',
    accent: '#9333ea',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #9333ea 100%)',
    gradientHover: 'linear-gradient(135deg, #9333ea 0%, #a855f7 50%, #7e22ce 100%)',
    bg: '#faf5ff',
    card: '#ffffff',
    text: '#581c87',
  },
  pink: {
    name: 'Pink Blossom',
    primary: '#ec4899',
    secondary: '#f472b6',
    accent: '#db2777',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 50%, #db2777 100%)',
    gradientHover: 'linear-gradient(135deg, #db2777 0%, #ec4899 50%, #be185d 100%)',
    bg: '#fdf2f8',
    card: '#ffffff',
    text: '#831843',
  },
  rainbow: {
    name: 'Rainbow',
    primary: '#6366f1',
    secondary: '#8b5cf6',
    accent: '#ec4899',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 25%, #ec4899 50%, #f59e0b 75%, #10b981 100%)',
    gradientHover: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 25%, #db2777 50%, #d97706 75%, #059669 100%)',
    bg: '#fef3c7',
    card: '#ffffff',
    text: '#1e1b4b',
  },
  neon: {
    name: 'Neon Cyber',
    primary: '#00f5ff',
    secondary: '#ff00ff',
    accent: '#00ff00',
    gradient: 'linear-gradient(135deg, #00f5ff 0%, #ff00ff 50%, #00ff00 100%)',
    gradientHover: 'linear-gradient(135deg, #00d4ff 0%, #ff00d4 50%, #00ff00 100%)',
    bg: '#0a0a0a',
    card: '#1a1a1a',
    text: '#ffffff',
  },
  default: {
    name: 'Default Blue',
    primary: '#3b82f6',
    secondary: '#6366f1',
    accent: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)',
    gradientHover: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)',
    bg: '#f8fafc',
    card: '#ffffff',
    text: '#1e293b',
  },
};

export const ColorThemeProvider = ({ children }) => {
  const [colorTheme, setColorTheme] = useState(() => {
    const saved = localStorage.getItem('colorTheme');
    return saved && colorThemes[saved] ? saved : 'default';
  });
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  useEffect(() => {
    localStorage.setItem('colorTheme', colorTheme);
    
    // Apply theme colors to CSS variables
    const theme = colorThemes[colorTheme];
    const root = document.documentElement;
    
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-bg', theme.bg);
    root.style.setProperty('--color-card', theme.card);
    root.style.setProperty('--color-text', theme.text);
    root.style.setProperty('--gradient-primary', theme.gradient);
    root.style.setProperty('--gradient-hover', theme.gradientHover);

    // Smooth transition
    gsap.to(root, {
      duration: 0.5,
      ease: 'power2.inOut',
    });
  }, [colorTheme]);

  const toggleThemeSelector = () => {
    setShowThemeSelector(!showThemeSelector);
  };

  return (
    <ColorThemeContext.Provider
      value={{
        colorTheme,
        setColorTheme,
        colorThemes,
        currentTheme: colorThemes[colorTheme],
        showThemeSelector,
        toggleThemeSelector,
      }}
    >
      {children}
    </ColorThemeContext.Provider>
  );
};

