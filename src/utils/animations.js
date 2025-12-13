import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Fade in animation
export const fadeIn = (element, delay = 0, duration = 0.8) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration, delay, ease: 'power3.out' }
  );
};

// Slide in from left
export const slideInLeft = (element, delay = 0, duration = 0.8) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: -50 },
    { opacity: 1, x: 0, duration, delay, ease: 'power3.out' }
  );
};

// Slide in from right
export const slideInRight = (element, delay = 0, duration = 0.8) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration, delay, ease: 'power3.out' }
  );
};

// Scale in animation
export const scaleIn = (element, delay = 0, duration = 0.6) => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration, delay, ease: 'back.out(1.7)' }
  );
};

// Stagger children animation
export const staggerChildren = (parent, delay = 0.1, duration = 0.6) => {
  return gsap.fromTo(
    parent.children,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger: delay,
      ease: 'power3.out',
    }
  );
};

// Counter animation
export const animateCounter = (element, targetValue, duration = 2) => {
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: targetValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = obj.value.toLocaleString('en-PK', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
  });
};

// Scroll triggered fade in
export const scrollFadeIn = (element, trigger = null) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: trigger || element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );
};

// Parallax effect
export const parallax = (element, speed = 0.5) => {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// Timeline for complex animations
export const createTimeline = () => {
  return gsap.timeline();
};

// Button press animation
export const buttonPress = (element) => {
  const tl = gsap.timeline();
  tl.to(element, { scale: 0.95, duration: 0.1 })
    .to(element, { scale: 1, duration: 0.2, ease: 'back.out(1.7)' });
  return tl;
};

// Card hover animation
export const cardHover = (element) => {
  return gsap.to(element, {
    y: -10,
    scale: 1.02,
    duration: 0.3,
    ease: 'power2.out',
  });
};

export const cardHoverOut = (element) => {
  return gsap.to(element, {
    y: 0,
    scale: 1,
    duration: 0.3,
    ease: 'power2.out',
  });
};

// Shimmer loading effect
export const shimmer = (element) => {
  return gsap.to(element, {
    backgroundPosition: '200% 0',
    duration: 1.5,
    ease: 'none',
    repeat: -1,
  });
};

// Cleanup function
export const cleanup = (animations) => {
  animations.forEach((anim) => {
    if (anim && anim.kill) anim.kill();
  });
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

