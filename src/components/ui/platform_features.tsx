import { FC, useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { motion } from 'framer-motion';
import { ThemeProviderContext } from '@/provider/theme-provider';
import leetcode from '@/assets/leetcode.svg';
import leetcodeLight from '@/assets/leetcodeLight.svg';
import { Github, Code, Trophy, Zap, ArrowRight, GitMerge } from 'lucide-react';
import leaderboardImg from '@/assets/leaderboard.png';
import { cn } from '@/lib/utils';

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

interface PlatformFeaturesProps {
  className?: string;
}

const PlatformFeatures: FC<PlatformFeaturesProps> = ({ className }) => {
  const { theme } = useContext(ThemeProviderContext);

  return (
    <div className="flex justify-around items-center flex-col lg:flex-row-reverse gap-12 w-full">
      <Card className={cn('lg:max-w-5xl 2xl:max-w-4xl', className)}>
        <CardHeader className="pb-0">
          <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
            Unified Coding Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Feature description */}
            <motion.p variants={itemVariants} className="text-white/50">
              Combine your coding platform statistics in one place. Track your progress across
              multiple platforms and showcase your skills.
            </motion.p>

            {/* Platform integration showcase */}
            <motion.div
              variants={itemVariants}
              className="grid items-stretch grid-cols-1 md:grid-cols-2 gap-4"
            >
              {/* GitHub Card */}
              <div className="relative group overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all duration-300"></div>
                <div className="relative z-10 p-4 backdrop-blur-sm  rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-background/80  shadow-sm">
                      <Github className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">GitHub Integration</h3>
                  </div>
                  <ul className="space-y-2 text-sm ">
                    <li className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-amber-500" />
                      <span>Track stars across all repositories</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <GitMerge className="h-4 w-4 text-green-500" />
                      <span>Monitor forks and contributions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-500" />
                      <span>Showcase your most popular projects</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* LeetCode Card */}
              <div className="relative group overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 group-hover:from-amber-500/20 group-hover:to-orange-500/20 transition-all duration-300"></div>
                <div className="relative z-10 p-4 backdrop-blur-sm  rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-background/80  shadow-sm">
                      <img
                        src={theme === 'dark' ? leetcode : leetcodeLight}
                        alt="LeetCode"
                        className="h-5 w-5"
                      />
                    </div>
                    <h3 className="font-semibold text-lg">LeetCode Integration</h3>
                  </div>
                  <ul className="space-y-2 text-sm ">
                    <li className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-green-500" />
                      <span>Track solved problems by difficulty</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-amber-500" />
                      <span>Monitor contest ratings and rankings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-blue-500" />
                      <span>Showcase your badges and achievements</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-teal-500/10 group-hover:from-green-500/20 group-hover:to-teal-500/20 transition-all duration-300"></div>
                <div className="relative z-10 p-4 backdrop-blur-sm rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-full bg-background/80 shadow-sm">
                      <Trophy className="h-5 w-5 text-green-500" />
                    </div>
                    <h3 className="font-semibold text-lg">Leaderboard Showcase</h3>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm mb-3 md:mb-0">
                        Compete with peers and climb the ranks! Our leaderboard tracks performance
                        across various coding challenges and platforms, motivating you to push your
                        limits. See how you stack up in real time and celebrate your achievements as
                        you rise through the ranks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300"></div>
                <div className="relative z-10 p-4 backdrop-blur-sm rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                      Combined Statistics
                    </span>
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </h3>
                  <p className="text-sm ">
                    Our platform combines your GitHub and LeetCode statistics to provide a
                    comprehensive view of your coding journey. Showcase your problem-solving skills
                    alongside your project contributions for a complete developer profile.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
      <img
        src={leaderboardImg}
        alt="Leaderboard Preview"
        className="rounded-lg border w-auto h-auto lg:max-w-1/3 object-cover"
      />
    </div>
  );
};

export default PlatformFeatures;
