import { questionColorsEnum } from '@/constants/colors';
import { contestRating } from '@/interface/leetcode';
import { Code } from '@/interface/profile';
import { Questions } from '@/interface/questions';
import { toast } from 'sonner';

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success('Copied to clipboard');
};

export const Question2PieChartValues = (questions: Questions) => {
  return [
    { label: 'Easy', value: questions.easy, color: questionColorsEnum.easy },
    { label: 'Medium', value: questions.medium, color: questionColorsEnum.medium },
    { label: 'Hard', value: questions.hard, color: questionColorsEnum.hard },
    { label: 'CP', value: questions.cp, color: questionColorsEnum.cp },
  ];
};

export const Platform2PieChartValues = (codeProfile: Code) => {
  if (
    !codeProfile ||
    !codeProfile.leetcode ||
    !codeProfile.leetcode.questions ||
    !Array.isArray(codeProfile.leetcode.questions)
  ) {
    return [];
  }
  const leetcode = codeProfile.leetcode.questions.reduce((acc, cur) => acc + cur.count, 0);
  return [{ label: 'Leetcode', value: leetcode, color: questionColorsEnum.leetcode }];
};

export const Question2LineChartValues = (contest?: contestRating[]) => {
  if (!contest || !Array.isArray(contest)) {
    return [];
  }
  return contest.map(c => {
    return {
      label: c.contest.title,
      value: Math.round(c.rating),
    };
  });
};

export const PlatformContestData = (code: Code) => {
  const leetcode = code.leetcode?.contest?.userContestRanking || {};
  return [
    {
      name: 'Leetcode',
      attended: leetcode.attendedContestsCount || 0,
      rating: Math.round(leetcode.rating || 0) || 0,
    },
  ];
};
