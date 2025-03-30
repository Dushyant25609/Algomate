import { FC, memo } from 'react';
import { GithubUserData } from '@/interface/github';
import { Github, Star, GitBranch } from 'lucide-react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/motion/user-card';

interface GithubUserCardProps {
  github: GithubUserData;
}

const GithubUserCard: FC<GithubUserCardProps> = ({ github }) => {
  // Calculate total stars and forks from all repositories
  const totalStars = github.repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = github.repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  return (
    <motion.div
      className="space-y-3"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          <h2 className="text-sm md:text-base font-medium">GitHub</h2>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex items-center gap-2">
        <div>
          <div>
            <img src={github.avatar_url} alt="" />
            <h1>{github.name}</h1>
          </div>
          <p className="text-muted-foreground text-sm">{github.bio}</p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2 text-xs md:text-sm">
        <div className="flex items-center gap-2 bg-secondary/30 rounded-md p-2">
          <div className="flex items-center gap-1">
            <span className="font-medium">{github.followers}</span>
            <span className="text-muted-foreground">followers</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-secondary/30 rounded-md p-2">
          <div className="flex items-center gap-1">
            <span className="font-medium">{github.repos.length}</span>
            <span className="text-muted-foreground">repositories</span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2 text-xs md:text-sm">
        <div className="flex items-center gap-2 bg-secondary/30 rounded-md p-2">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-amber-500 mr-1" />
            <span className="font-medium">{totalStars}</span>
            <span className="text-muted-foreground">stars</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-secondary/30 rounded-md p-2">
          <div className="flex items-center gap-1">
            <GitBranch className="h-3.5 w-3.5 text-green-500 mr-1" />
            <span className="font-medium">{totalForks}</span>
            <span className="text-muted-foreground">forks</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default memo(GithubUserCard);
