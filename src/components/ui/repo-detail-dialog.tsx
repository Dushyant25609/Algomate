import { FC } from 'react';
import { GitHubRepo } from '@/interface/github';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  ExternalLink,
  Star,
  GitBranch,
  Code,
  Github,
  Calendar,
  Eye,
  Lock,
  Unlock,
} from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';
import { ScriptCopyBtn } from '../magicui/script-copy-btn';
import { motion, AnimatePresence } from 'framer-motion';

// Dialog animation variants
const dialogVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1], // Custom ease curve for a premium feel
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.36, 0, 0.66, -0.56], // Custom ease curve for exit
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
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
};

const linkVariants = {
  hover: {
    scale: 1.02,
    backgroundColor: 'rgba(var(--accent), 0.2)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
};

interface RepoDetailDialogProps {
  repo: GitHubRepo | null;
  isOpen: boolean;
  onClose: () => void;
}

const RepoDetailDialog: FC<RepoDetailDialogProps> = ({ repo, isOpen, onClose }) => {
  if (!repo) return null;
  const customCommandMap = {
    HTTPS: repo.clone_url,
    SSh: repo.ssh_url,
    git: repo.git_url,
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <AnimatePresence mode="wait">
        {isOpen && (
          <DialogContent className="max-w-3xl">
            <motion.div variants={dialogVariants} initial="hidden" animate="visible" exit="exit">
              <DialogHeader>
                <motion.div variants={itemVariants}>
                  <DialogTitle className="flex items-center gap-2 text-2xl">
                    <Github className="h-6 w-6 text-accent" />
                    {repo.name}
                    <div className="text-sm px-2 py-1 rounded-full bg-secondary flex items-center gap-1">
                      {repo.private ? (
                        <>
                          <Lock className="h-3 w-3" /> Private
                        </>
                      ) : (
                        <>
                          <Unlock className="h-3 w-3" /> Public
                        </>
                      )}
                    </div>
                  </DialogTitle>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <DialogDescription className="text-base text-card-foreground mt-2">
                    {repo.description || 'No description provided'}
                  </DialogDescription>
                </motion.div>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <motion.div
                  variants={cardVariants}
                  className="space-y-4 bg-secondary/20 p-4 rounded-lg"
                >
                  <h3 className="text-lg font-medium mb-2">Repository Details</h3>
                  <div className="space-y-2">
                    <motion.div variants={itemVariants} className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-accent" />
                      <span className="font-medium">Language:</span>{' '}
                      {repo.language || 'Not specified'}
                    </motion.div>
                    <motion.div variants={itemVariants} className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-amber-500" />
                      <span className="font-medium">Stars:</span> {repo.stargazers_count}
                    </motion.div>
                    <motion.div variants={itemVariants} className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Forks:</span> {repo.forks_count}
                    </motion.div>
                    <motion.div variants={itemVariants} className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">Watchers:</span> {repo.watchers_count}
                    </motion.div>
                    <motion.div variants={itemVariants} className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <span className="font-medium">Full Name:</span> {repo.full_name}
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  variants={cardVariants}
                  className="space-y-4 bg-secondary/20 p-4 rounded-lg"
                >
                  <h3 className="text-lg font-medium mb-2">Repository Links</h3>
                  <div className="space-y-2">
                    <motion.div variants={itemVariants} whileHover={linkVariants.hover}>
                      <Button asChild variant="outline" className="w-full justify-start">
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" /> View on GitHub
                        </a>
                      </Button>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger className="w-full px-3 py-2 justify-start border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground">
                            <Code className="h-4 w-4" /> Clone Repository
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col justify-center">
                            <ScriptCopyBtn
                              showMultiplePackageOptions={true}
                              codeLanguage="shell"
                              lightTheme="nord"
                              darkTheme="vitesse-dark"
                              commandMap={customCommandMap}
                              className="self-start "
                            />
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default RepoDetailDialog;
