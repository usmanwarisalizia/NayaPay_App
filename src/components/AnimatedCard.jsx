import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { scaleIn, cardHover, cardHoverOut } from '../utils/animations';

const AnimatedCard = ({
  children,
  className = '',
  delay = 0,
  hoverable = true,
  ...props
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView && cardRef.current) {
      scaleIn(cardRef.current, delay);
    }
  }, [isInView, delay]);

  const handleMouseEnter = () => {
    if (hoverable && cardRef.current) {
      cardHover(cardRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (hoverable && cardRef.current) {
      cardHoverOut(cardRef.current);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;

