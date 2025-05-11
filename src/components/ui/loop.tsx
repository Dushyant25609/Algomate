import { useState, useEffect } from 'react';
import { Footer } from '../layout/footer';

export default function LoopingIndex() {
  const arr = [1, 3, 2, 4];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % arr.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [arr.length, paused]);

  return (
    <div className="flex flex-col">
      <div
        className="flex items-center justify-center h-screen text-2xl font-bold"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        Index: {index}
      </div>
      <Footer />
    </div>
  );
}
