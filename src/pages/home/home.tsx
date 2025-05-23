import HeroSection from '@/components/layout/hero';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import PlatformFeatures from '@/components/ui/platform_features';
import { memo } from 'react';
import { motion } from 'framer-motion';

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
          className="w-full max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent inline-block mb-4">
              Powerful Platform Integration
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Combine your coding stats from multiple platforms into one unified profile
            </p>
          </div>
          <PlatformFeatures className="max-w-4xl mx-auto" />
        </motion.div>
      </div>
    </div>
  );
};

export default memo(home);
