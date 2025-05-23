import HeroSection from '@/components/layout/hero';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import PlatformFeatures from '@/components/ui/platform_features';
import { memo } from 'react';
import { motion } from 'framer-motion';
import AvatarJourney from '@/components/ui/avatar-journey';

const home = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <BackgroundBeamsWithCollision
        className="fixed inset-0 -z-10"
        children={undefined}
      ></BackgroundBeamsWithCollision>
      <div className="w-full flex-grow">
        <HeroSection />

        <motion.div
          className="w-full my-64 px-4 sm:px-6 lg:px-8 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block mb-4">
              Powerful Platform Integration
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combine your coding stats from multiple platforms into one unified profile
            </p>
          </div>
          <PlatformFeatures />
        </motion.div>
        <AvatarJourney />
      </div>
    </div>
  );
};

export default memo(home);
