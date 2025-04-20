import { FC, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, UserPlus, Check, X, User } from 'lucide-react';
import userService from '@/services/userService';
import UserAvatar from '@/components/ui/avatar/user-avatar';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store';
import { SearchAction } from '@/store/slices/userSlice';
import { Input } from '@/components/ui/input';
import { SearchUserResponse } from '@/interface/user';
import { AvatarConfig, AvatarConfig2 } from '@/interface/avatar';
import { Request } from '@/interface/friend';
import { itemVariants } from '@/motion/friend-search-animations';
import {
  searchContainerVariants,
  searchInputVariants,
  resultsContainerVariants,
  resultCardVariants,
  emptyStateVariants,
  sectionAnimationProps,
} from '@/motion/search-results-animations';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchUserFriendRequest, fetchUserPendingRequest } from '@/store/slices/friendSlices';

interface UserCardProps {
  user: SearchUserResponse;
  avatar: AvatarConfig | AvatarConfig2;
  currentUsername: string;
  pendingFriends: Request[];
  acceptedFriends: string[];
  onSendRequest: (username: string) => void;
  onAcceptRequest: (username: string) => void;
  onRejectRequest: (username: string) => void;
  onRemoveFriend: (username: string) => void;
  onUnsendRequest: (username: string) => void;
}

const UserSearchCard: FC<UserCardProps> = ({
  user,
  avatar,
  currentUsername,
  pendingFriends,
  acceptedFriends,
  onSendRequest,
  onAcceptRequest,
  onRejectRequest,
  onRemoveFriend,
  onUnsendRequest,
}) => {
  const isPending = pendingFriends.some(friend => friend.username === user.username);
  const isAccepted = acceptedFriends.includes(user.username);
  const isSelf = currentUsername === user.username;
  const index = pendingFriends.findIndex(friend => friend.username === user.username);

  return (
    <motion.div variants={resultCardVariants} initial="hidden" animate="visible" whileHover="hover">
      <Card className="w-full shadow-md py-0 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <UserAvatar
              publicAvatar={avatar}
              classname="w-12 h-12 aspect-square"
              roundness="rounded-full"
            />
            <div>
              <h3 className="font-medium text-lg">{user.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <User className="h-3 w-3" />
                {user.username}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {isSelf ? (
              <Button variant="outline" disabled>
                You
              </Button>
            ) : isAccepted ? (
              <Button variant="destructive" size="sm" onClick={() => onRemoveFriend(user.username)}>
                <X className="h-4 w-4 mr-1" /> Remove
              </Button>
            ) : isPending ? (
              <div className="flex gap-2">
                {pendingFriends[index].type == 'received' ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAcceptRequest(user.username)}
                    >
                      <Check className="h-4 w-4 mr-1" /> Accept
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onRejectRequest(user.username)}
                    >
                      <X className="h-4 w-4 mr-1" /> Reject
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUnsendRequest(user.username)}
                  >
                    Sent
                  </Button>
                )}
              </div>
            ) : (
              <Button variant="secondary" size="sm" onClick={() => onSendRequest(user.username)}>
                <UserPlus className="h-4 w-4 mr-1" /> Add Friend
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const FriendSearch: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const user = useAppSelector(state => state.user);
  const requests = useAppSelector(state => state.friend.requests);
  const friends = useAppSelector(state => state.friend.friends);
  const dispatch = useAppDispatch();
  const { searchResults, searchError } = useAppSelector(state => state.user);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    dispatch(SearchAction(searchQuery));
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      handleSearch();
    }
  }, [searchQuery]);

  // Show error toast if search fails
  useEffect(() => {
    if (searchError) {
      toast.error(searchError || 'Failed to search users');
    }
  }, [searchError]);

  useEffect(() => {
    dispatch(fetchUserPendingRequest());
    dispatch(fetchUserFriendRequest());
  }, [dispatch]);

  const handleSendRequest = async (username: string) => {
    try {
      await userService.sendFriendRequest(username);
      toast.success(`Friend request sent to ${username}`);
      // Then refresh from server
      dispatch(fetchUserPendingRequest());
      dispatch(fetchUserFriendRequest());
    } catch (error) {
      console.error('Error sending friend request:', error);
      toast.error('Failed to send friend request');
    }
  };

  const handleAcceptRequest = async (username: string) => {
    try {
      await userService.acceptFriendRequest(username);
      toast.success(`Friend request from ${username} accepted`);
      // Then refresh from server
      dispatch(fetchUserPendingRequest());
      dispatch(fetchUserFriendRequest());
    } catch (error) {
      console.error('Error accepting friend request:', error);
      toast.error('Failed to accept friend request');
    }
  };

  const handleRejectRequest = async (username: string) => {
    try {
      await userService.rejectFriendRequest(username);
      toast.success(`Friend request from ${username} rejected`);
      // Then refresh from server
      dispatch(fetchUserPendingRequest());
      dispatch(fetchUserFriendRequest());
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      toast.error('Failed to reject friend request');
    }
  };

  const handleRemoveFriend = async (username: string) => {
    try {
      await userService.removeFriend(username);
      toast.success(`${username} removed from friends`);
      dispatch(fetchUserPendingRequest());
      dispatch(fetchUserFriendRequest());
    } catch (error) {
      console.error('Error removing friend:', error);
      toast.error('Failed to remove friend');
    }
  };

  const handleUnsendRequest = async (username: string) => {
    try {
      await userService.unsendFriendRequest(username);
      toast.success(`Friend request to ${username} unsent`);
      // Then refresh from server
      dispatch(fetchUserPendingRequest());
      dispatch(fetchUserFriendRequest());
    } catch (error) {
      console.error('Error unsending friend request:', error);
      toast.error('Failed to unsend friend request');
    }
  };

  return (
    <motion.div
      className="max-w-11/12 md:max-w-full xl:max-w-11/12 py-8flex flex-col gap-6"
      initial="hidden"
      animate="visible"
      variants={searchContainerVariants}
    >
      <motion.div {...sectionAnimationProps}>
        <Card className="w-full shadow-md">
          <CardHeader>
            <motion.div className="flex gap-2" variants={searchInputVariants}>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search users by username"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9"
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </motion.div>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <AnimatePresence>
              {searchResults && searchResults.user && searchResults.user.length > 0 ? (
                <motion.div className="flex flex-col gap-3" variants={resultsContainerVariants}>
                  {searchResults.user
                    .filter(friend => friend.username !== user.username)
                    .map((result, index) => (
                      <UserSearchCard
                        key={result.username}
                        user={result}
                        avatar={searchResults.avatar[index]}
                        currentUsername={user.username || ''}
                        pendingFriends={requests.requests || []}
                        acceptedFriends={friends.friends || []}
                        onSendRequest={handleSendRequest}
                        onAcceptRequest={handleAcceptRequest}
                        onRejectRequest={handleRejectRequest}
                        onRemoveFriend={handleRemoveFriend}
                        onUnsendRequest={handleUnsendRequest}
                      />
                    ))}
                </motion.div>
              ) : searchQuery ? (
                <motion.div
                  className="p-6 text-center text-muted-foreground"
                  variants={emptyStateVariants}
                >
                  No users found.
                </motion.div>
              ) : null}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div {...sectionAnimationProps}>
        <Card className="md:flex-row px-8 gap-3 w-full justify-around">
          {requests && (
            <motion.div variants={itemVariants} className="flex flex-col gap-3 w-full">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                Friend Requests
                {requests && requests.requests.length > 0 && (
                  <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                    {requests && requests.requests.length}
                  </span>
                )}
              </h2>
              <Card className="shadow-md w-full">
                <CardContent className="p-0">
                  {requests && requests.requests.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto">
                      {requests &&
                        requests.requests.map((request, index) => (
                          <div
                            key={request.username}
                            className={`flex items-center justify-between p-4 ${index % 2 === 0 ? 'bg-secondary/10' : 'bg-secondary/30'} hover:bg-secondary/50 transition-colors duration-200 ${index !== requests.requests.filter(req => req.type === 'received').length - 1 ? 'border-b border-border/30' : ''}`}
                          >
                            <div className="flex items-center gap-3">
                              <UserAvatar publicAvatar={requests.avatars[index]} />
                              <span className="font-medium">{request.username}</span>
                            </div>
                            <div className="flex gap-2">
                              {requests.requests[index].type == 'received' ? (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleAcceptRequest(request.username)}
                                  >
                                    <Check className="h-4 w-4 mr-1" /> Accept
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleRejectRequest(request.username)}
                                  >
                                    <X className="h-4 w-4 mr-1" /> Reject
                                  </Button>
                                </>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleUnsendRequest(request.username)}
                                >
                                  Sent
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      No pending friend requests
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}{' '}
          {friends && friends.friends && (
            <motion.div variants={itemVariants} className="flex flex-col gap-3 w-full">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                Your Friends
                {friends && friends.friends.length > 0 && (
                  <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                    {friends && friends.friends.length}
                  </span>
                )}
              </h2>
              <Card className="shadow-md w-full">
                <CardContent className="p-0 w-full">
                  {friends && friends.friends.length > 0 ? (
                    <div className="max-h-80 overflow-y-auto w-full">
                      <div className="flex flex-col divide-y divide-border/30 w-full">
                        {friends &&
                          friends.friends.map((friendUsername, index) => (
                            <div
                              key={friendUsername}
                              className={`flex items-center justify-between p-4 ${index % 2 === 0 ? 'bg-secondary/10' : 'bg-secondary/30'} hover:bg-secondary/50 transition-colors duration-200`}
                            >
                              <div className="flex items-center gap-3">
                                {friends.avatars && (
                                  <UserAvatar publicAvatar={friends.avatars[index]} />
                                )}
                                <span className="font-medium">{friendUsername}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="xs"
                                onClick={() => handleRemoveFriend(friendUsername)}
                              >
                                <X />
                              </Button>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center text-muted-foreground">
                      You don't have any friends yet. Search for users to add them as friends.
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default FriendSearch;
