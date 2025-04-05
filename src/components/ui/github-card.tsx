import { FC, memo, useState } from 'react';
import { Github, ExternalLink, Star, GitBranch, Code } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { GithubUserData } from '@/interface/github';
import { motion, AnimatePresence } from 'framer-motion';
import {
  repoContainerVariants,
  repoCardVariants,
  titleVariants,
  statsVariants,
  buttonVariants,
} from '@/motion/repo-card';

interface GitHubProps {
  github: GithubUserData;
}

const GitHubRepoCards: FC<GitHubProps> = ({ github }) => {
  const [selectedRepo, setSelectedRepo] = useState<(typeof github.repos)[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRepoClick = (repo: (typeof github.repos)[0]) => {
    setSelectedRepo(repo);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={repoContainerVariants}
      className="w-full"
    >
      <Card className="flex flex-col gap-4 p-4 shadow-sm">
        <motion.div className="flex items-center gap-2 px-2" variants={titleVariants}>
          <Github className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-medium text-card-foreground">GitHub Profile</h2>
        </motion.div>

        <motion.div
          className="flex items-center gap-4 px-2 text-sm text-muted-foreground"
          variants={statsVariants}
        >
          <div className="flex items-center gap-1">
            <span className="font-medium">{github.followers}</span> followers
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{github.repos.length}</span> repositories
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <AnimatePresence>
            {github.repos.map((repo, index) => (
              <motion.div
                key={index}
                variants={repoCardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: index * 0.05 }}
                layout
              >
                <Card className="h-full cursor-pointer" onClick={() => handleRepoClick(repo)}>
                  <CardHeader className="pb-2">
                    <motion.div variants={titleVariants}>
                      <CardTitle className="text-base">{repo.name}</CardTitle>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    {repo.description && (
                      <motion.p
                        className="text-sm text-muted-foreground line-clamp-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {repo.description}
                      </motion.p>
                    )}
                    <motion.div
                      className="flex items-center space-x-4 text-gray-600 text-xs"
                      variants={statsVariants}
                    >
                      {repo.language && (
                        <div className="flex items-center">
                          <Code className="w-3.5 h-3.5 mr-1" /> {repo.language}
                        </div>
                      )}
                      <div className="flex items-center">
                        <Star className="w-3.5 h-3.5 mr-1" /> {repo.stargazers_count}
                      </div>
                      <div className="flex items-center">
                        <GitBranch className="w-3.5 h-3.5 mr-1" /> {repo.forks_count}
                      </div>
                    </motion.div>
                    <motion.div variants={buttonVariants} whileHover="hover">
                      <Button className="w-full mt-2" asChild size="sm" variant="secondary">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()} // Prevent card click when clicking the button
                        >
                          <ExternalLink className="w-3.5 h-3.5 mr-1" /> View Repo
                        </a>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {selectedRepo && (
          <Dialog open={isDialogOpen} onOpenChange={open => !open && handleCloseDialog()}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Github className="h-5 w-5 text-accent" />
                  {selectedRepo.name}
                </DialogTitle>
                {selectedRepo.description && (
                  <DialogDescription className="text-base text-card-foreground mt-2">
                    {selectedRepo.description}
                  </DialogDescription>
                )}
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-4 bg-secondary/20 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Repository Details</h3>
                  <div className="space-y-2">
                    {selectedRepo.language && (
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-accent" />
                        <span className="font-medium">Language:</span> {selectedRepo.language}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-amber-500" />
                      <span className="font-medium">Stars:</span> {selectedRepo.stargazers_count}
                    </div>
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Forks:</span> {selectedRepo.forks_count}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 bg-secondary/20 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-2">Repository Links</h3>
                  <div className="space-y-2">
                    <Button asChild variant="outline" className="w-full justify-start">
                      <a href={selectedRepo.html_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" /> View on GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </Card>
    </motion.div>
  );
};

export default memo(GitHubRepoCards);
