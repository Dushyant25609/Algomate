import { MotionProps } from 'framer-motion';

// Navbar animation variants
export const navbarAnimationProps: MotionProps = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

// Underline animation for active nav items
export const navItemUnderlineProps: MotionProps = {
  layoutId: 'navbar-underline',
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 },
};
