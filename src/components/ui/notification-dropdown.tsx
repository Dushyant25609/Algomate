import { FC, memo } from 'react';
import { Bell, Check, X, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Request } from '@/interface/friend';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from './dropdown-menu';
import userService from '@/services/userService';
import { useAppDispatch } from '@/store';
import { loginRequest } from '@/store/slices/userSlice';

interface NotificationDropdownProps {
  pendingRequests: Request[];
  className?: string;
}

const NotificationDropdown: FC<NotificationDropdownProps> = ({ pendingRequests, className }) => {
  const pendingCount = pendingRequests.length;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleAcceptRequest = async (username: string) => {
    try {
      await userService.acceptFriendRequest(username);
      toast.success(`Friend request from ${username} accepted`);
      // Refresh user data from server
      dispatch(loginRequest());
    } catch (error) {
      console.error('Error accepting friend request:', error);
      toast.error('Failed to accept friend request');
    }
  };

  const handleRejectRequest = async (username: string) => {
    try {
      await userService.rejectFriendRequest(username);
      toast.success(`Friend request from ${username} rejected`);
      // Refresh user data from server
      dispatch(loginRequest());
    } catch (error) {
      console.error('Error rejecting friend request:', error);
      toast.error('Failed to reject friend request');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={`relative ${className}`}>
          <Bell className="h-5 w-5" />
          {pendingCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {pendingCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <DropdownMenuLabel>Friend Requests</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {pendingCount > 0 ? (
          <div className="max-h-60 overflow-y-auto">
            {pendingRequests.map(request => (
              <DropdownMenuItem
                key={request.username}
                className="flex flex-col items-start p-2"
                asChild
              >
                <div>
                  <div className="flex w-full justify-between items-center">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{request.username}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => handleAcceptRequest(request.username)}
                      >
                        <Check className="h-3 w-3 mr-1" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => handleRejectRequest(request.username)}
                      >
                        <X className="h-3 w-3 mr-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        ) : (
          <div className="py-2 px-4 text-center text-sm text-muted-foreground">
            No pending friend requests
          </div>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/friends')} className="justify-center">
          View All Friends
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(NotificationDropdown);
