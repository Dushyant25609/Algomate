import { FC, useEffect, useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  fetchLeaderboardRequest,
  fetchFilteredLeaderboardRequest,
} from '@/store/slices/leaderboardSlice';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Trophy, Medal, Search, Filter, ArrowUpDown, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import UserAvatar from '@/components/ui/avatar/user-avatar';

const LeaderboardPage: FC = () => {
  const dispatch = useAppDispatch();
  const {
    data: leaderboardData,
    pagination,
    loading,
    error,
  } = useAppSelector(state => state.leaderboard);
  const currentUser = useAppSelector(state => state.user);
  const [searchQuery, setSearchQuery] = useState('');
  const [platform, setPlatform] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate current user rank and total users
  const { currentUserRank, totalUsers } = useMemo(() => {
    // Total users from pagination data
    const total = pagination.totalRecords || 0;

    // Find current user's rank in the leaderboard data
    let userRank = null;
    if (currentUser.username && leaderboardData.length > 0) {
      // Find the index of the current user in the data
      const userIndex = leaderboardData.findIndex(entry => entry.username === currentUser.username);
      if (userIndex !== -1) {
        // Use the index+1 as the rank
        userRank = userIndex + 1;
      }
    }

    return { currentUserRank: userRank, totalUsers: total };
  }, [leaderboardData, pagination.totalRecords, currentUser.username]);

  // Fetch leaderboard data on component mount
  useEffect(() => {
    dispatch(fetchLeaderboardRequest());
  }, [dispatch]);

  // Handle platform filter change
  const handlePlatformChange = (value: string) => {
    setPlatform(value);
    setCurrentPage(1);
    if (value === 'all') {
      dispatch(fetchLeaderboardRequest());
    } else {
      dispatch(fetchFilteredLeaderboardRequest());
    }
  };

  // Handle search
  const handleSearch = () => {
    // In a real implementation, you might want to add search functionality to the API
    // For now, we'll just filter the data client-side
    dispatch(fetchLeaderboardRequest());
  };

  // Handle sort order change
  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
  };

  // Add rank and name properties to entries if they don't exist
  const processedData = leaderboardData.map((entry, index) => ({
    ...entry,
    rank: index + 1, // Always use index+1 as the rank
    name: entry.username,
    score: entry.leetcode?.contest?.userContestRanking?.rating || 0,
    problemsSolved: entry.questions?.total || 0,
    contestsParticipated: entry.leetcode?.contest?.userContestRanking?.attendedContestsCount || 0,
  }));

  // Sort the data based on the current sort order
  const sortedData = [...processedData].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.score - b.score;
    } else {
      return b.score - a.score;
    }
  });

  // Re-assign ranks after sorting
  sortedData.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  // Filter data based on search query (client-side filtering)
  const filteredData = sortedData.filter(
    entry =>
      entry.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.name && entry.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Pagination - using the pagination data from the API response
  const totalPages = pagination.totalPages;
  const paginatedData = filteredData; // Data is already paginated from the API

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <motion.div
      className="container max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Page Header */}
      <div className="w-full mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold">Leaderboard</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          See how you rank among other users in the community
        </p>
        {currentUserRank && (
          <div className="mt-2 p-2 bg-accent/30 rounded-md inline-block">
            <span className="text-sm font-medium">Your current rank: </span>
            <span className="text-primary font-bold">{currentUserRank}</span>
            <span className="text-sm text-muted-foreground"> out of {totalUsers} users</span>
          </div>
        )}
      </div>

      {/* Filters and Search */}
      <Card className="shadow-md">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 w-full sm:w-auto gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by username or name"
                  className="pl-8"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button variant="default" onClick={handleSearch}>
                Search
              </Button>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <div className="flex-1 sm:flex-initial">
                <Select value={platform} onValueChange={handlePlatformChange}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    <SelectItem value="leetcode">LeetCode</SelectItem>
                    <SelectItem value="codeforces">CodeForces</SelectItem>
                    <SelectItem value="codechef">CodeChef</SelectItem>
                    <SelectItem value="gfg">GeeksForGeeks</SelectItem>
                    <SelectItem value="codeStudio">CodeStudio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                onClick={toggleSortOrder}
                className="flex-1 sm:flex-initial"
              >
                <ArrowUpDown className="mr-2 h-4 w-4" />
                {sortOrder === 'desc' ? 'Highest First' : 'Lowest First'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard Table */}
      <Card className="shadow-md overflow-hidden">
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
          ) : paginatedData.length === 0 ? (
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
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                    Problems Solved
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider hidden lg:table-cell">
                    Contests
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedData.map(entry => (
                  <tr
                    key={entry.username}
                    className={cn(
                      'hover:bg-muted/50 transition-colors',
                      entry.username === 'current-user' && 'bg-primary/10'
                    )}
                  >
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {entry.rank <= 3 ? (
                          <Medal
                            className={cn(
                              'h-5 w-5 mr-1',
                              entry.rank === 1
                                ? 'text-yellow-500'
                                : entry.rank === 2
                                  ? 'text-gray-400'
                                  : 'text-amber-600'
                            )}
                          />
                        ) : (
                          <span className="text-sm font-medium w-5 mr-1 text-center">
                            {entry.rank}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <UserAvatar classname="h-10 w-10" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium">{entry.name}</div>
                          <div className="text-sm text-muted-foreground">@{entry.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-primary">{entry.score}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                      <div className="text-sm">{entry.problemsSolved || 'N/A'}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                      <div className="text-sm">{entry.contestsParticipated || 'N/A'}</div>
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
                    {Math.min(currentPage * itemsPerPage, filteredData.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredData.length}</span> results
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
