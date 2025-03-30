import { MotionProps } from 'framer-motion';

// Settings page container animation
export const settingsContainerProps: MotionProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
};

// Tab navigation container animation
export const tabNavigationProps: MotionProps = {
  initial: { opacity: 0, y: -5 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

// Active tab indicator animation
export const activeTabIndicatorProps: MotionProps = {
  layoutId: 'settings-active-tab',
  transition: {
    type: 'spring',
    stiffness: 500,
    damping: 30,
  },
};

// Tab content animation variants
export const tabContentVariants = {
  hidden: { opacity: 0, x: 10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.2,
    },
  },
};

// Tab button hover animation
export const tabButtonHoverProps: MotionProps = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 },
  transition: { duration: 0.2 },
};
