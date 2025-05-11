import UserCard from '@/components/layout/user-card';
import { FC, memo, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { GetPublicProfile, updateProfileRequest } from '@/store/slices/profileSlices';
import QuestionPieChart from '@/components/layout/Pie';
import { questionColors } from '@/constants/colors';
import {
  Platform2PieChartValues,
  PlatformContestData,
  Question2LineChartValues,
  Question2PieChartValues,
} from '@/lib/hook';
import Line from '@/components/layout/Line';
import SubmissionHeatmap from '@/components/layout/Heat';
import Badges from '@/components/ui/badges';
import PlatformContest from '@/components/ui/platform-contest';
import GitHubRepoCards from '@/components/ui/repo-card';
import { useParams } from 'react-router-dom';

const getUserLevel = (rating: number, questionSolved: number): string => {
  if (questionSolved < 100 || rating < 1200) return 'Beginner';
  if ((questionSolved < 300 || rating < 1400) && questionSolved) return 'Intermediate';
  if (questionSolved < 400 || rating < 1600) return 'Advanced';
  if (questionSolved < 600 || rating < 1800) return 'Expert';
  if (questionSolved < 1000 || rating < 2000) return 'Master';
  return 'Grand Master';
};

const Dashboard: FC = () => {
  const user = useAppSelector(state => state.user);
  const profile = useAppSelector(state => state.profile);
  const username = useParams().username;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      !profile.updated &&
      user.isAuthenticated &&
      user &&
      (user.githubToken || (user.platforms && user.platforms.leetcode))
    ) {
      dispatch(updateProfileRequest(username));
    }
  });

  // We use the username from props instead of trying to modify the URL params
  useEffect(() => {
    dispatch(GetPublicProfile(username));
  });
  return (
    <div className="max-w-11/12 md:max-w-full  xl:max-w-11/12 py-3 flex flex-col gap-3">
      <div className="flex flex-col justify-center md:flex-row gap-3">
        <UserCard
          name={profile?.user?.name || user.name || ''}
          username={profile?.user?.username || user.username || ''}
          platforms={profile?.user?.platforms || user.platforms || {}}
          socials={profile?.user?.social || user.social || {}}
          github={profile?.github}
          userLevel={useMemo(
            () =>
              getUserLevel(
                profile?.code?.leetcode?.contest?.userContestRanking?.rating || 0,
                profile?.code?.questions?.total || 0
              ),
            [
              profile?.code?.leetcode?.contest?.userContestRanking?.rating,
              profile?.code?.questions?.total,
            ]
          )}
          publicAvatar={profile?.avatar}
          country={profile?.user?.country || user?.country}
          bio={profile?.user?.bio || user?.bio}
          city={profile?.user?.city || user?.city}
          company={profile?.user?.company || user?.company}
          college={profile?.user?.college || user?.college}
        />
        <div className="w-full flex flex-col gap-2 items-center h-full">
          <div className="flex gap-3 w-full flex-col justify-center lg:flex-row-reverse">
            <PlatformContest platform={profile.code ? PlatformContestData(profile?.code) : []} />
            <div className="flex flex-col justify-stretch gap-3 w-full h-full">
              <Line
                className=""
                ChartValues={Question2LineChartValues(
                  profile?.code?.leetcode?.contest?.userContestRankingHistory
                )}
                globalRanking={
                  profile?.code?.leetcode?.contest?.userContestRanking?.globalRanking || 0
                }
                totalParticipants={
                  profile?.code?.leetcode?.contest?.userContestRanking?.totalParticipants || 0
                }
                rating={
                  Math.round(profile?.code?.leetcode?.contest?.userContestRanking?.rating || 0) || 0
                }
                attended={
                  profile?.code?.leetcode?.contest?.userContestRanking?.attendedContestsCount || 0
                }
              />
            </div>
          </div>

          <QuestionPieChart
            QuestionsChartValues={
              profile?.code ? Question2PieChartValues(profile?.code.questions) : []
            }
            PlatformChartValues={profile?.code ? Platform2PieChartValues(profile?.code) : []}
            COLORS={questionColors}
            className="w-full"
          />
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row gap-3">
        <SubmissionHeatmap
          activeDays={profile?.code?.leetcode?.heatmap?.totalActiveDays || 0}
          activeYears={profile?.code?.leetcode?.heatmap?.activeYears || []}
          submissionCalendar={profile?.code?.leetcode?.heatmap?.submissionCalendar || ''}
          className=""
          maxStreak={profile?.code?.leetcode?.heatmap?.streak || 0}
        />
        <Badges
          className="md:flex-1/3 xl:flex-1/2"
          badges={
            Array.isArray(profile?.code?.leetcode?.badges) ? profile?.code?.leetcode?.badges : []
          }
        />
      </div>
      {profile.github?.name && <GitHubRepoCards repositories={profile?.github?.repos || []} />}
    </div>
  );
};

export default memo(Dashboard);
