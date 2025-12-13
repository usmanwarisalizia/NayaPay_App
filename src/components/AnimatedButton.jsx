import { useRef, forwardRef } from 'react';
import { useColorTheme } from '../contexts/ColorThemeContext';
import { buttonPress } from '../utils/animations';

const AnimatedButton = forwardRef(({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  as: Component = 'button',
  ...props
}, ref) => {
  const buttonRef = useRef(null);
  const { currentTheme } = useColorTheme();
  const elementRef = ref || buttonRef;

  const handleClick = (e) => {
    if (!disabled && elementRef.current) {
      buttonPress(elementRef.current);
    }
    if (onClick) onClick(e);
  };

  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform inline-block text-center';
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: currentTheme.gradient,
          color: 'white',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        };
      case 'secondary':
        return {
          background: currentTheme.bg,
          color: currentTheme.text,
          border: `2px solid ${currentTheme.primary}30`,
        };
      case 'outline':
        return {
          border: `2px solid ${currentTheme.primary}`,
          color: currentTheme.primary,
          background: 'transparent',
        };
      default:
        return {
          background: currentTheme.gradient,
          color: 'white',
        };
    }
  };

  const buttonProps = Component === 'button' 
    ? { disabled, type: 'button' }
    : {};

  return (
    <Component
      ref={elementRef}
      onClick={handleClick}
      className={`${baseStyles} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl cursor-pointer'} ${className}`}
      style={getVariantStyles()}
      onMouseEnter={(e) => {
        if (!disabled && variant === 'primary') {
          e.currentTarget.style.background = currentTheme.gradientHover;
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && variant === 'primary') {
          e.currentTarget.style.background = currentTheme.gradient;
        }
      }}
      {...buttonProps}
      {...props}
    >
      {children}
    </Component>
  );
});

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;

