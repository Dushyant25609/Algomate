import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star, GitBranch, Code, Github } from 'lucide-react';
import { GitHubRepo } from '@/interface/github';
import { FC, memo, useRef, useState } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import RepoDetailDialog from './repo-detail-dialog';

interface ReposProps {
  repositories: GitHubRepo[];
}

const GitHubRepoCards: FC<ReposProps> = ({ repositories }) => {
  const scrollRef = useRef(null);
  const { events } = useDraggable(scrollRef as unknown as React.MutableRefObject<HTMLElement>);
  const [selectedRepo, setSelectedRepo] = useState<GitHubRepo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRepoClick = (repo: GitHubRepo) => {
    setSelectedRepo(repo);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Card className="flex flex-col px-4 gap-1  overflow-y-scroll h-60">
      <div className="flex items-center gap-2 px-6">
        <Github className="h-6 w-6 text-accent" />
        <h2 className="text-2xl font-medium text-card-foreground">GitHub Repositories</h2>
      </div>
      <div
        ref={scrollRef}
        {...events}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 cursor-grab active:cursor-grabbing"
      >
        {repositories.map(repo => (
          <Card
            key={repo.id}
            className="hover:shadow-md transition-all duration-200 hover:border-accent/50 cursor-pointer"
            onClick={() => handleRepoClick(repo)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between ">
                <p className="w-full">{repo.name}</p>
                <span className="text-sm text-gray-500">{repo.private ? 'Private' : 'Public'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-4 text-gray-600 text-sm">
                <div className="flex items-center">
                  <Code className="w-4 h-4 mr-1" /> {repo.language}
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1" /> {repo.stargazers_count}
                </div>
                <div className="flex items-center">
                  <GitBranch className="w-4 h-4 mr-1" /> {repo.forks_count}
                </div>
              </div>
              <Button className="w-full" asChild size="sm" variant="secondary">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()} // Prevent card click when clicking the button
                >
                  <ExternalLink className="w-4 h-4 mr-1" /> View Repo
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <RepoDetailDialog repo={selectedRepo} isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </Card>
  );
};

export default memo(GitHubRepoCards);
