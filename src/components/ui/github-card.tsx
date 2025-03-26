import { FC, memo } from 'react';

interface GitHubProps {
  github: {
    followers: number;
    repos: {
      name: string;
      description: string;
      language: string;
      stars: number;
      forks: number;
      url: string;
    }[];
  };
}

const GitHubRepoCards: FC<GitHubProps> = ({ github }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-sm md:text-base text-foreground/50">Github</h2>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm text-muted-foreground">
            {github.followers} followers
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm text-muted-foreground">
            {github.repos.length} public repos
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(GitHubRepoCards);
