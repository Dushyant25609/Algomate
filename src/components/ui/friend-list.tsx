import { cn } from '@/lib/utils';
import { Search, Users } from 'lucide-react';
import { FC, memo, useState } from 'react';

interface FriendListProps {
  friends: string[];
}

const FriendList: FC<FriendListProps> = ({ friends = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const filteredFriends = friends.filter(friend =>
    friend.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
        <Users className="h-4 w-4" />
        <span>Friends ({friends.length})</span>
      </h3>
      <div className="relative mb-2">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search friends..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-8 pr-4 py-2 text-sm bg-secondary/50 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
      {filteredFriends.length > 0 ? (
        <div className="flex flex-col h-28 overflow-auto">
          {filteredFriends.map((friend, index) => (
            <div
              key={friend}
              className={cn(
                'text-sm w-full text-center py-2 px-2',
                index % 2 == 0 ? 'bg-secondary' : 'bg-accent/30',
                index == 0 ? 'rounded-t-md' : '',
                index == filteredFriends.length - 1 ? 'rounded-b-md' : ''
              )}
            >
              {friend}
            </div>
          ))}
        </div>
      ) : (
        <span className="text-sm text-muted-foreground">No friends yet</span>
      )}
    </div>
  );
};

export default memo(FriendList);
