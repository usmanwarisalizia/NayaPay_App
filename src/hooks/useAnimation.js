import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import * as anim from '../utils/animations';

export const useFadeIn = (delay = 0, duration = 0.8) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView && ref.current) {
      anim.fadeIn(ref.current, delay, duration);
    }
  }, [isInView, delay, duration]);

  return ref;
};

export const useScrollFadeIn = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const animation = anim.scrollFadeIn(ref.current);
      return () => animation.kill();
    }
  }, []);

  return ref;
};

export const useStaggerChildren = (delay = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView && ref.current) {
      anim.staggerChildren(ref.current, delay);
    }
  }, [isInView, delay]);

  return ref;
};

export const useCounterAnimation = (value, duration = 2) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && value) {
      anim.animateCounter(ref.current, value, duration);
    }
  }, [value, duration]);

  return ref;
};

export const useButtonPress = () => {
  const ref = useRef(null);

  const handlePress = () => {
    if (ref.current) {
      anim.buttonPress(ref.current);
    }
  };

  return { ref, handlePress };
};

export const useCardHover = () => {
  const ref = useRef(null);

  const handleMouseEnter = () => {
    if (ref.current) {
      anim.cardHover(ref.current);
    }
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      anim.cardHoverOut(ref.current);
    }
  };

  return { ref, handleMouseEnter, handleMouseLeave };
};

