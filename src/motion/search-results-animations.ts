import { MotionProps } from 'framer-motion';

// Animation for the search container
export const searchContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
};

// Animation for the search input field
export const searchInputVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

// Animation for search results container
export const resultsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.05,
      duration: 0.3,
    },
  },
};

// Animation for individual search result cards
export const resultCardVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      stiffness: 300,
      damping: 20,
    },
  },
};

// Animation for empty state
export const emptyStateVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      stiffness: 200,
      damping: 20,
      delay: 0.2,
    },
  },
};

// Animation props for the main sections
export const sectionAnimationProps: MotionProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};
