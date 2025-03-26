export interface Platform {
  leetcode?: string;
  codeforces?: string;
  codechef?: string;
  gfg?: string;
  codeStudio?: string;
}

export interface Leetcode {
  problems: Problem;
  contest: Contest;
  submissions: string[];
  badges: string[];
  dailyProblem: boolean;
}

export interface Codeforces {
  problems: Problem;
  contest: Contest;
  submissions: string[];
  badges: string[];
}

export interface Codechef {
  problems: Problem;
  contest: Contest;
  submissions: string[];
  badges: string[];
}

export interface Gfg {
  problems: Problem;
  contest: Contest;
  submissions: string[];
  badges: string[];
}

export interface CodeStudio {
  problems: Problem;
  contest: Contest;
  submissions: string[];
  badges: string[];
}

export interface Problem {
  easy: number;
  medium: number;
  hard: number;
}

export interface Contest {
  rating: number;
  maxRating?: number;
  rank?: number;
  attended: number;
}
