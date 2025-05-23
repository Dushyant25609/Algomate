import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import UserAvatar from '@/components/ui/avatar/user-avatar';
import { AvatarConfig2 } from '@/interface/avatar';
import { Sparkles, Code, Trophy, GitBranch, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
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

// Sample avatar configurations for different coding milestones
const beginnerAvatar: AvatarConfig2 = {
  backgrounds: { from: '#4F46E5', to: '#7C3AED' },
  accessories: 'None',
  bodies: 'RoboDanceWB',
  faces: 'EyesClosed',
  hair: 'MediumShade',
  facialHair: 'None',
};

const intermediateAvatar: AvatarConfig2 = {
  backgrounds: { from: '#10B981', to: '#059669' },
  accessories: 'SunglassWayfarer',
  bodies: 'Bike',
  faces: 'Calm',
  hair: 'GrayShort',
  facialHair: 'Full',
};

const advancedAvatar: AvatarConfig2 = {
  backgrounds: { from: '#F59E0B', to: '#D97706' },
  accessories: 'GlassAviator',
  bodies: 'Gaming',
  faces: 'Angry',
  hair: 'Mohawk',
  facialHair: 'GrayFull',
};

interface AvatarJourneyProps {
  className?: string;
}

const AvatarJourney: FC<AvatarJourneyProps> = ({ className }) => {
  const [activeAvatar, setActiveAvatar] = useState<'beginner' | 'intermediate' | 'advanced'>(
    'beginner'
  );

  const getAvatarConfig = () => {
    switch (activeAvatar) {
      case 'beginner':
        return beginnerAvatar;
      case 'intermediate':
        return intermediateAvatar;
      case 'advanced':
        return advancedAvatar;
      default:
        return beginnerAvatar;
    }
  };

  return (
    <motion.div
      className={cn('w-full py-12 my-64', className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent inline-block mb-3">
          Your Coding Avatar Journey
        </h2>
        <p className="text-muted-foreground max-w-4xl mx-auto">
          Express your coding identity with customizable avatars that evolve with your programming
          journey
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 max-w-6xl mx-auto">
        {/* 3D Card with Avatar Showcase */}
        <CardContainer className="w-full ">
          <CardBody className="bg-gradient-to-br from-black/20 to-black/60 border border-white/10 rounded-xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-secondary/10 group-hover:from-primary/20 group-hover:via-purple-500/20 group-hover:to-secondary/20 transition-all duration-500"></div>

            <CardItem
              translateZ={50}
              className="w-full pt-8 pb-6 px-6 flex flex-col items-center justify-center"
            >
              <div className="relative mb-4">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary to-secondary rounded-full blur-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <UserAvatar publicAvatar={getAvatarConfig()} classname="w-full h-full" />
                </div>
                <CardItem
                  translateZ={120}
                  className="absolute -top-2 -right-2 bg-primary/90 text-white p-1.5 rounded-full shadow-lg"
                >
                  <Sparkles className="w-4 h-4" />
                </CardItem>
              </div>

              <CardItem translateZ={60} className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  {activeAvatar === 'beginner' && 'Code Explorer'}
                  {activeAvatar === 'intermediate' && 'Algorithm Artisan'}
                  {activeAvatar === 'advanced' && 'Tech Maestro'}
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  {activeAvatar === 'beginner' && 'Taking first steps in the coding universe'}
                  {activeAvatar === 'intermediate' &&
                    'Mastering patterns and solving complex problems'}
                  {activeAvatar === 'advanced' && 'Architecting solutions and mentoring others'}
                </p>
              </CardItem>

              <CardItem translateZ={80} className="flex gap-3 mt-2">
                <button
                  onClick={() => setActiveAvatar('beginner')}
                  className={`px-3 py-1.5 text-xs rounded-full transition-all ${activeAvatar === 'beginner' ? 'bg-primary text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                >
                  Beginner
                </button>
                <button
                  onClick={() => setActiveAvatar('intermediate')}
                  className={`px-3 py-1.5 text-xs rounded-full transition-all ${activeAvatar === 'intermediate' ? 'bg-primary text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                >
                  Intermediate
                </button>
                <button
                  onClick={() => setActiveAvatar('advanced')}
                  className={`px-3 py-1.5 text-xs rounded-full transition-all ${activeAvatar === 'advanced' ? 'bg-primary text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'}`}
                >
                  Advanced
                </button>
              </CardItem>
            </CardItem>
          </CardBody>
        </CardContainer>

        {/* Feature Description */}
        <motion.div variants={containerVariants} className="w-full max-w-4xl px-4">
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-3">
              Avatars That Tell Your Story
            </h3>
            <p className="text-muted-foreground mb-4">
              Your coding journey is unique. Our custom avatars evolve with your progress,
              reflecting your growth from beginner to expert. Express your personality and showcase
              your achievements through a visual identity that's uniquely yours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              variants={itemVariants}
              className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-primary/20">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                <h4 className="font-semibold">Skill Representation</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Unlock new avatar features as you master different programming languages and
                technologies.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-primary/20">
                  <Trophy className="h-5 w-5 text-amber-500" />
                </div>
                <h4 className="font-semibold">Achievement Badges</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Earn special accessories and backgrounds by completing coding challenges and
                milestones.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-primary/20">
                  <GitBranch className="h-5 w-5 text-green-500" />
                </div>
                <h4 className="font-semibold">Platform Integration</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Your avatar automatically updates based on your GitHub contributions and LeetCode
                progress.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-white/10 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-primary/20">
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <h4 className="font-semibold">Full Customization</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Fine-tune every aspect of your avatar with our intuitive editor to make it truly
                yours.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AvatarJourney;
