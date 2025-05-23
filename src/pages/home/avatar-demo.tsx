import { FC } from 'react';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import AvatarJourney from '@/components/ui/avatar-journey';
import { motion } from 'framer-motion';

const AvatarDemo: FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <BackgroundBeamsWithCollision className="fixed inset-0 -z-10" children={undefined} />
      <div className="w-full flex-grow px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          className="max-w-7xl mx-auto"
        >
          <AvatarJourney />
        </motion.div>
      </div>
    </div>
  );
};

export default AvatarDemo;
