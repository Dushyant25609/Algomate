'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

export const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  items: {
    name: string;
    img: string;
    hoverImg: string;
    hoverBg?: string;
  }[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach(item => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === 'left') {
        containerRef.current.style.setProperty('--animation-direction', 'forwards');
      } else {
        containerRef.current.style.setProperty('--animation-direction', 'reverse');
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === 'fast') {
        containerRef.current.style.setProperty('--animation-duration', '20s');
      } else if (speed === 'normal') {
        containerRef.current.style.setProperty('--animation-duration', '40s');
      } else {
        containerRef.current.style.setProperty('--animation-duration', '80s');
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map(badge => (
          <div
            key={badge.name}
            className="relative overflow-hidden inline-block transition-all duration-300 ease-in-out transform hover:scale-105"
            onMouseEnter={() => setHover(badge.name)}
            onMouseLeave={() => setHover(null)}
          >
            {hover === badge.name ? (
              <div className="relative">
                {/* Background Icon */}
                <img
                  className="absolute top-0 left-0 w-full h-full object-contain opacity-50"
                  src={badge.hoverBg}
                  alt=""
                />
                {/* Foreground Icon */}
                <img
                  className="relative z-10 h-20  transition-all duration-500 object-contain"
                  src={badge.hoverImg}
                  alt={badge.name}
                />
              </div>
            ) : (
              <img
                className="h-20 brightness-90 dark:brightness-50 transition-all duration-500 object-contain"
                src={badge.img}
                alt={badge.name}
              />
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};
