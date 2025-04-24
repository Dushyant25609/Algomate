import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchLeaderboardRequest,
  fetchFilteredLeaderboardRequest,
} from '@/store/slices/leaderboardSlice';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Medal, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/ui/avatar/user-avatar';
import { LeaderboardSortBy } from '@/interface/leaderboard';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, generatePath } from '@/lib/routes';
import { toast } from 'sonner';
import { Sort } from '@/constants/leaderboard';
import { PerformerCard } from '@/components/ui/performer-card';

const LeaderboardPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    data: leaderboardData,
    avatars,
    topPerformers,
    pagination,
    loading,
    error,
  } = useAppSelector(state => state.leaderboard);
  const currentUser = useAppSelector(state => state.user);
  useEffect(() => {
    if (currentUser && !currentUser.platforms?.leetcode) {
      toast.info('Please connect your LeetCode account to view the leaderboard.');
      navigate(AppRoutes.SETTINGS);
    }
  }, [currentUser, navigate]);
  const [sortBy, setSortBy] = useState<LeaderboardSortBy>('questions');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchLeaderboardRequest());
  }, [dispatch]);

  // Handle platform filter change
  const handleSortByChange = (value: LeaderboardSortBy) => {
    setSortBy(value);
    setCurrentPage(1);
    if (value === 'questions') {
      dispatch(fetchLeaderboardRequest());
    } else {
      dispatch(
        fetchFilteredLeaderboardRequest({
          sortBy: value,
        })
      );
    }
  };

  // Pagination - using the pagination data from the API response
  const totalPages = pagination.totalPages;

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <motion.div
      className="container max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        when: 'beforeChildren',
        staggerChildren: 0.1,
      }}
    >
      <div className="flex flex-col flex-wrap md:flex-row gap-3 md:items-center">
        {topPerformers.map(performer => (
          <PerformerCard
            key={performer.score}
            username={performer.profile.username}
            rank={performer.type}
            avatar={performer.avatar}
            score={performer.score}
            onClick={() =>
              navigate(
                generatePath(AppRoutes.DASHBOARD_WITH_PARAM, {
                  user: performer?.profile.username || '',
                })
              )
            }
          />
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex gap-2 w-full sm:w-auto">
        {/* Sort By */}
        {Sort.map(sort => (
          <Button
            key={sort.value}
            variant={sortBy === sort.value ? 'selected' : 'secondary'}
            onClick={() => handleSortByChange(sort.value)}
            className="cursor-pointer"
          >
            {sort.label}
          </Button>
        ))}
      </div>

      {/* Leaderboard Table */}
      <Card className="shadow-md overflow-hidden py-0">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading leaderboard data...</span>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">
              <p>Error loading leaderboard: {error}</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => dispatch(fetchLeaderboardRequest())}
              >
                Try Again
              </Button>
            </div>
          ) : leaderboardData.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p>No results found. Try adjusting your filters.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                    Rating
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                    Problems Solved
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                    Ranking
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry, index) => (
                  <tr
                    key={entry.username}
                    className={cn(
                      'hover:bg-accent/30 odd:bg-card even:bg-background transition-colors cursor-pointer',
                      entry.username === 'current-user' && 'bg-primary/10'
                    )}
                    onClick={() =>
                      navigate(
                        generatePath(AppRoutes.DASHBOARD_WITH_PARAM, {
                          user: entry?.username || '',
                        })
                      )
                    }
                  >
                    <td key={entry.username} className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {index + 1 <= 3 ? (
                          <Medal
                            className={cn(
                              'h-5 w-5 mr-1',
                              index + 1 === 1
                                ? 'text-yellow-500'
                                : index + 1 === 2
                                  ? 'text-gray-400'
                                  : 'text-amber-600'
                            )}
                          />
                        ) : (
                          <span className="text-sm font-medium w-5 mr-1 text-center">
                            {index + 1}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center flex-wrap">
                        <div className="flex-shrink-0 h-10 w-10">
                          <UserAvatar publicAvatar={avatars[index]} classname="h-10 w-10" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">{entry.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-sm font-bold text-primary">
                        {Math.round(
                          entry.leetcode?.contest.userContestRanking.rating || 0
                        ).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-sm">
                        {entry.questions?.total.toLocaleString() || 'N/A'}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-sm">
                        {entry.leetcode?.profile.profile.ranking.toLocaleString() || 'N/A'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="px-4 py-3 flex items-center justify-between border-t border-border">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Showing{' '}
                  <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(currentPage * itemsPerPage, leaderboardData.length)}
                  </span>{' '}
                  of <span className="font-medium">{leaderboardData.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <Button
                    variant="outline"
                    className="rounded-l-md"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? 'default' : 'outline'}
                      className={cn('rounded-none', {
                        'bg-primary text-primary-foreground': currentPage === page,
                      })}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    className="rounded-r-md"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default LeaderboardPage;
