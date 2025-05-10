import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star, GitBranch, Code, Github } from 'lucide-react';
import { GitHubRepo } from '@/interface/github';
import { FC, memo, useRef, useState } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import RepoDetailDialog from './repo-detail-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import {
  repoContainerVariants,
  repoCardVariants,
  titleVariants,
  statsVariants,
  buttonVariants,
  paginationVariants,
} from '@/motion/repo-card';

interface ReposProps {
  repositories: GitHubRepo[];
}

const GitHubRepoCards: FC<ReposProps> = ({ repositories }) => {
  const scrollRef = useRef(null);
  const { events } = useDraggable(scrollRef as unknown as React.MutableRefObject<HTMLElement>);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 6;

  const handleRepoClick = (repo: GitHubRepo) => {
    setSelectedRepo(repo);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Calculate pagination values
  const totalPages = Math.ceil(repositories.length / reposPerPage);
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repositories.slice(indexOfFirstRepo, indexOfLastRepo);

  // Handle page changes
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={repoContainerVariants}
      className="w-full"
    >
      <Card className="flex flex-col px-4 gap-1 overflow-y-auto">
        <motion.div className="flex items-center gap-2 px-6" variants={titleVariants}>
          <Github className="h-6 w-6 text-accent" />
          <h2 className="text-2xl font-medium text-card-foreground">GitHub Repositories</h2>
        </motion.div>
        <div
          ref={scrollRef}
          {...events}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 cursor-grab active:cursor-grabbing"
        >
          <AnimatePresence>
            {currentRepos.map((repo, index) => (
              <motion.div
                key={repo.id}
                variants={repoCardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: index * 0.05 }}
                layout
              >
                <div className="p-[1px] rounded-2xl bg-gradient-to-t from-transparent via-accent to-accent">
                  <Card
                    className="h-full cursor-pointer rounded-2xl bg-card"
                    onClick={() => handleRepoClick(repo)}
                  >
                    <CardHeader>
                      <motion.div variants={titleVariants}>
                        <CardTitle className="flex items-center justify-between">
                          <p className="w-full">{repo.name}</p>
                          <span className="text-sm text-gray-500">
                            {repo.private ? 'Private' : 'Public'}
                          </span>
                        </CardTitle>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <motion.div
                        className="flex items-center space-x-4 text-gray-600 text-sm"
                        variants={statsVariants}
                      >
                        <div className="flex items-center">
                          <Code className="w-4 h-4 mr-1" /> {repo.language}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1" /> {repo.stargazers_count}
                        </div>
                        <div className="flex items-center">
                          <GitBranch className="w-4 h-4 mr-1" /> {repo.forks_count}
                        </div>
                      </motion.div>
                      <motion.div variants={buttonVariants} whileHover="hover">
                        <Button className="w-full" asChild size="sm" variant="outline">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="flex items-center justify-center"
                          >
                            <div className="flex items-center justify-center">
                              <ExternalLink className="w-4 h-4 mr-1" />
                              <span>View Repo</span>
                            </div>
                          </a>
                        </Button>
                      </motion.div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center gap-2 py-2 border-t border-border"
            variants={paginationVariants}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                &lt;
              </Button>
            </motion.div>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                <motion.div key={pageNumber} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant={currentPage === pageNumber ? 'backdrop' : 'ghost'}
                    size="sm"
                    onClick={() => goToPage(pageNumber)}
                    className="h-8 w-8 p-0"
                  >
                    {pageNumber}
                  </Button>
                </motion.div>
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                &gt;
              </Button>
            </motion.div>
          </motion.div>
        )}

        <RepoDetailDialog repo={selectedRepo} isOpen={isDialogOpen} onClose={handleCloseDialog} />
      </Card>
    </motion.div>
  );
};

export default memo(GitHubRepoCards);
