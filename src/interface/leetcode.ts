export interface userProfile {
  username: string;
  profile: profile;
}

export interface profile {
  ranking: number;
  realName: string;
  aboutMe: string;
  countryName: string;
}

export interface userContest {
  userContestRanking: contestRanking;
  userContestRankingHistory: contestRating[];
}

export interface contestRanking {
  attendedContestsCount: number;
  rating: number;
  globalRanking: number;
  totalParticipants: number;
  topPercentage: number;
  badge: string | null;
}

export interface contestRating {
  attended: boolean;
  trendDirection: 'UP' | 'DOWN' | 'NONE';
  problemsSolved: number;
  totalProblems: number;
  rating: number;
  ranking: number;
  contest: {
    title: string;
  };
}

export interface question {
  count: number;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
}

export interface userBadges {
  badges: badge[];
}

export interface badge {
  displayName: string;
  icon: string;
  hoverText: string;
  medal: medal;
}

export interface medal {
  config: {
    iconGif: string;
    iconGifBackground: string;
  };
}

export interface LeetCodeUserData {
  profile: userProfile;
  contest: userContest;
  questions: question[];
  badges: userBadges;
  heatmap: userHeatmap;
}

export interface userHeatmap {
  activeYears: number[];
  streak: number;
  totalActiveDays: number;
  submissionCalendar: string;
}
