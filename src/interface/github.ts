export interface GithubUserData {
  name: string;
  profileUrl: string;
  bio: string;
  followers: string;
  following: string;
  avatar_url: string;
  repos: GitHubRepo[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  language?: string;
  deployments_url: string | null;
  git_url: string;
  ssh_url: string;
  clone_url: string;
}
