import { FC, memo } from 'react';
import { Card } from './card';
import { cn } from '@/lib/utils';
import leetcode from '@/assets/leetcode.svg';
import { Trophy } from 'lucide-react';

interface Contest {
  name: string;
  attended: number;
  rating: number;
}

interface PlatformContest {
  platform: Contest[];
}

const PlatformsContest: FC<PlatformContest> = ({ platform }) => {
  const totalContest = platform.reduce((sum, item) => sum + item.attended, 0);
  return (
    <Card className="w-full px-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-accent" />
          <h2 className="text-2xl font-medium text-card-foreground">Contests</h2>
        </div>
        <p className="text-2xl">{totalContest}</p>
      </div>
      <div className="flex flex-col">
        {platform ? (
          platform.map(item => (
            <div
              key={item.name}
              className={cn(
                'flex items-center justify-between gap-3 lg:gap-12 px-4 py-3 rounded-md w-full border transition-all'
              )}
            >
              <div className="flex items-center gap-2">
                <img src={leetcode} alt="leetcode" className="h-4 w-4" />
                <h2 className="text- font-medium">{item.name}</h2>
              </div>
              <div className="flex items-center gap-1 h-full">
                <p className="text-sm brightness-75">{item.attended}</p>
                <span className="border-r border-card-foreground brightness-75 h-2/3" />
                <p className="text-sm brightness-75">{item.rating}</p>
              </div>
            </div>
          ))
        ) : (
          <h2>Data doesnt exist</h2>
        )}
      </div>
    </Card>
  );
};
export default memo(PlatformsContest);
