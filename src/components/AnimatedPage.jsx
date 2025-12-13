import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const AnimatedPage = ({ children, className = '' }) => {
  const pageRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (pageRef.current) {
      // Page enter animation
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        }
      );
    }
  }, [location.pathname]);

  return (
    <div ref={pageRef} className={className}>
      {children}
    </div>
  );
};

export default AnimatedPage;

