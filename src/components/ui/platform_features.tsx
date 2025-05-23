import { FC, useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { motion } from 'framer-motion';
import { ThemeProviderContext } from '@/provider/theme-provider';
import leetcode from '@/assets/leetcode.svg';
import leetcodeLight from '@/assets/leetcodeLight.svg';
import { Github, Code, Trophy, Zap, ArrowRight, GitMerge } from 'lucide-react';
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
    <Card className={cn('overflow-hidden', className)}>
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
          <motion.p variants={itemVariants} className="text-muted-foreground">
            Combine your coding platform statistics in one place. Track your progress across
            multiple platforms and showcase your skills.
          </motion.p>

          {/* Platform integration showcase */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* GitHub Card */}
            <div className="relative group overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 group-hover:from-purple-500/20 group-hover:to-blue-500/20 transition-all duration-300"></div>
              <div className="relative z-10 p-4 backdrop-blur-sm border border-border rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-background/80 border border-border shadow-sm">
                    <Github className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">GitHub Integration</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
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
              <div className="relative z-10 p-4 backdrop-blur-sm border border-border rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-background/80 border border-border shadow-sm">
                    <img
                      src={theme === 'dark' ? leetcode : leetcodeLight}
                      alt="LeetCode"
                      className="h-5 w-5"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">LeetCode Integration</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
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
          </motion.div>

          {/* Combined Stats Feature */}
          <motion.div variants={itemVariants} className="mt-2">
            <div className="relative overflow-hidden rounded-xl group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300"></div>
              <div className="relative z-10 p-4 backdrop-blur-sm border border-border rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                    Combined Statistics
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </h3>
                <p className="text-sm text-muted-foreground">
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
  );
};

export default PlatformFeatures;
