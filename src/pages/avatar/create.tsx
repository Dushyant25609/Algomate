import React, { useEffect, useState } from 'react';
import Showcase from '@/components/ui/peeps-Maker';
import { AvatarConfig, BodyType } from '@/interface/avatar';
import { peepOptions } from '@/constants/peeps';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccessoryType, FaceType, FacialHairType, HairType } from 'react-peeps';
import { useAppDispatch, useAppSelector } from '@/store';
import { AvatarAction } from '@/store/slices/avatarSlice';
import { Shuffle } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';

// Animation variants for a premium feel
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 24,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      delay: 0.2,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const CreateAvatar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>({
    background: peepOptions.solidBackgrounds[0],
    accessory: peepOptions.accessories[0] as AccessoryType,
    body: peepOptions.bodies[0] as BodyType,
    face: peepOptions.faces[0] as FaceType,
    hair: peepOptions.hair[0] as HairType,
    facialHair: peepOptions.facialHair[0] as FacialHairType,
  });

  const avatar = useAppSelector(state => state.avatar);
  const handleAvatarChange = (newConfig: AvatarConfig) => {
    setAvatarConfig(newConfig);
  };

  useEffect(() => {
    if (!avatar.create) {
      setIsOpen(false);
      navigate('/');
    }
  }, [avatar, navigate]);

  const handleSave = async () => {
    try {
      dispatch(AvatarAction(avatarConfig));
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      toast.error('Failed to save avatar');
    }
  };

  const getRandomItem = <T,>(items: T[]): T => {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  };

  const handleRandomize = () => {
    // Randomly decide between gradient and solid background
    const useGradient = Math.random() > 0.5;
    const randomBackground = useGradient
      ? getRandomItem(peepOptions.gradientBackgrounds)
      : getRandomItem(peepOptions.solidBackgrounds);

    const newConfig: AvatarConfig = {
      background: randomBackground,
      accessory: getRandomItem(peepOptions.accessories) as AccessoryType,
      body: getRandomItem(peepOptions.bodies) as BodyType,
      face: getRandomItem(peepOptions.faces) as FaceType,
      hair: getRandomItem(peepOptions.hair) as HairType,
      facialHair: getRandomItem(peepOptions.facialHair) as FacialHairType,
    };

    setAvatarConfig(newConfig);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent onCloseNavigate={'/'} className="sm:max-w-4xl">
        <DialogTitle className="sr-only">Create Avatar</DialogTitle>
        <AnimatePresence mode="wait">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
          >
            <Card className="border-none shadow-none">
              <CardHeader>
                <motion.div variants={itemVariants}>
                  <CardTitle className="text-3xl text-center text-accent-foreground">
                    Create Your Avatar
                  </CardTitle>
                </motion.div>
              </CardHeader>
              <CardContent>
                <motion.div className="flex flex-col gap-4 items-center" variants={itemVariants}>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                      delay: 0.2,
                    }}
                  >
                    <Showcase avatarConfig={avatarConfig} onAvatarChange={handleAvatarChange} />
                  </motion.div>
                  <motion.div
                    className="self-end w-full md:w-1/2 flex flex-col md:flex-row gap-2 mt-4"
                    variants={itemVariants}
                  >
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="flex-1"
                    >
                      <Button
                        variant="secondary"
                        onClick={handleRandomize}
                        className="w-full"
                        title="Generate Random Avatar"
                      >
                        <Shuffle className="mr-2 h-4 w-4" />
                        Random
                      </Button>
                    </motion.div>
                    <motion.div
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="flex-1"
                    >
                      <Button variant="default" onClick={handleSave} className="w-full">
                        Save Avatar
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAvatar;
