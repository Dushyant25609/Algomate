import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import loaderGif from '@/assets/loader.gif';

type LoaderSize = 'sm' | 'default' | 'lg';
type LoaderVariant = 'default' | 'primary' | 'secondary';
type LoaderType = 'spinner' | 'skeleton';

interface LoaderProps {
  size?: LoaderSize;
  variant?: LoaderVariant;
  fullScreen?: boolean;
  className?: string;
  type?: LoaderType;
  width?: string;
  height?: string;
  borderRadius?: string;
  children?: ReactNode;
}

const sizeClasses: Record<LoaderSize, string> = {
  sm: 'size-4 ',
  default: 'w-30 h-30 ',
  lg: 'size-12 ',
};

// Skeleton component for content placeholders
export const Skeleton: FC<{
  className?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
}> = ({ className, width, height, borderRadius = '0.5rem' }) => {
  return (
    <motion.div
      className={cn('bg-muted/60', className)}
      style={{ width, height, borderRadius }}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

// Main loader component that can render either spinner or skeleton
export const Loader: FC<LoaderProps> = ({
  size = 'default',
  fullScreen = false,
  className,
  type = 'spinner',
  width,
  height,
  borderRadius,
  children,
}) => {
  const Wrapper = fullScreen ? motion.div : motion.span;

  return (
    <Wrapper
      className={cn(
        'flex items-center justify-center',
        fullScreen && 'fixed inset-0 z-50',
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {type === 'spinner' ? (
        <img
          src={loaderGif}
          alt="Loading..."
          className={cn(sizeClasses[size])}
          style={{ objectFit: 'contain' }}
        />
      ) : (
        children || (
          <Skeleton
            width={width || '100%'}
            height={height || '100%'}
            borderRadius={borderRadius}
            className={className}
          />
        )
      )}
    </Wrapper>
  );
};
