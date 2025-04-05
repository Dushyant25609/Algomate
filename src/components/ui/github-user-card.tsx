import { FC, memo } from 'react';
import { GithubUserData } from '@/interface/github';
import { Github, Star, GitBranch, Users } from 'lucide-react';
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
      className="flex flex-col gap-2 p-1"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-1.5 rounded-md">
            <Github className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-sm md:text-base font-semibold">GitHub Profile</h2>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row items-start md:items-center gap-4"
      >
        <div className="relative group">
          {github.avatar_url && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
              <img
                src={github.avatar_url}
                alt={`${github.name}'s avatar`}
                className="w-16 h-16 rounded-full object-cover border-2 border-secondary/50 shadow-md relative z-10 group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute -bottom-1 -right-1 z-20 bg-background rounded-full p-1 shadow-sm border border-border">
                <Github className="h-4 w-4 text-primary" />
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 text-xs md:text-sm">
        <div className="relative overflow-hidden group rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 group-hover:from-blue-500/20 group-hover:to-indigo-500/20 transition-all duration-300"></div>
          <div className="flex items-center gap-2 p-2 backdrop-blur-sm relative z-10 h-full border border-border/50 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300">
            <Users className="h-4 w-4 text-blue-500 shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm md:text-base">{github.following || 0}</span>
              <span className="text-muted-foreground text-xs">followers</span>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden group rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all duration-300"></div>
          <div className="flex items-center gap-2 p-2 backdrop-blur-sm relative z-10 h-full border border-border/50 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300">
            <Github className="h-4 w-4 text-purple-500 shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm md:text-base">{github.repos.length}</span>
              <span className="text-muted-foreground text-xs">repositories</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 text-xs md:text-sm">
        <div className="relative overflow-hidden group rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 group-hover:from-amber-500/20 group-hover:to-orange-500/20 transition-all duration-300"></div>
          <div className="flex items-center gap-2 p-2 backdrop-blur-sm relative z-10 h-full border border-border/50 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300">
            <Star className="h-4 w-4 text-amber-500 shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm md:text-base">{totalStars}</span>
              <span className="text-muted-foreground text-xs">stars</span>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden group rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 group-hover:from-green-500/20 group-hover:to-emerald-500/20 transition-all duration-300"></div>
          <div className="flex items-center gap-2 p-2 backdrop-blur-sm relative z-10 h-full border border-border/50 rounded-lg shadow-sm group-hover:shadow-md transition-all duration-300">
            <GitBranch className="h-4 w-4 text-green-500 shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm md:text-base">{totalForks}</span>
              <span className="text-muted-foreground text-xs">forks</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default memo(GithubUserCard);
