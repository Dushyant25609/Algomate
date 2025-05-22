import { Footer } from '@/components/layout/footer';
import HeroSection from '@/components/layout/hero';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import { memo } from 'react';

const home = () => {
  return (
    <>
      <BackgroundBeamsWithCollision children={undefined}></BackgroundBeamsWithCollision>
      <div className="w-full">
        <HeroSection />
      </div>
      <Footer />
    </>
  );
};

export default memo(home);
