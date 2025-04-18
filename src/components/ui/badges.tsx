import { FC, memo } from 'react';
import { badge } from '@/interface/leetcode';
import { Card } from './card';
import { cn } from '@/lib/utils';
import { AwardIcon } from 'lucide-react';
import { InfiniteMovingCards } from './infinite-moving-cards';
import BadgeDialog from './badge-dialog';

interface BadgesProps {
  badges: badge[];
  className?: string;
}

const Badges: FC<BadgesProps> = ({ badges, className }) => {
  return (
    <Card
      className={cn('w-full flex flex-col py-4 px-6 overflow-auto shadow-md relative', className)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center text-3xl font-medium text-card-foreground">
          <AwardIcon className="h-7 w-7 text-accent" />
          <h2>
            Badges{' '}
            {badges.length > 0 && (
              <span className="text-base brightness-50 font-normal">({badges.length})</span>
            )}
          </h2>
        </div>
        {badges.length > 0 && <BadgeDialog badges={badges} />}
      </div>
      {/* Badge List */}
      <div className="flex items-center justify-center h-full">
        <div className="relative flex justify-center items-center w-36 overflow-hidden h-full">
          {/* Badge Container */}
          <div className="flex gap-4 items-center justify-center overflow-x-hidden scroll-smooth hide-scrollbar w-full ">
            <InfiniteMovingCards
              items={badges.map(badge => {
                return {
                  name: badge.displayName,
                  img: badge.icon?.includes('leetcode.com')
                    ? badge.icon
                    : `https://leetcode.com${badge.icon}`,
                  hoverImg: badge.medal.config.iconGif?.includes('leetcode.com')
                    ? badge.medal.config.iconGif
                    : `https://leetcode.com${badge.medal.config.iconGif}`,
                  hoverBg: badge.medal.config.iconGifBackground?.includes('leetcode.com')
                    ? badge.medal.config.iconGifBackground
                    : `https://leetcode.com${badge.medal.config.iconGifBackground}`,
                };
              })}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default memo(Badges);
