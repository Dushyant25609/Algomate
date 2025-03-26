import { Platform } from '@/interface/platform';
import { FC, memo } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './hover-card';
import leetcode from '@/assets/leetcode.svg';

interface PlatformCardProps {
  platforms: Platform;
}

const PlatformCard: FC<PlatformCardProps> = ({ platforms }) => {
  return (
    <div>
      <div className="flex items-center justify-center gap-2">
        {platforms.leetcode && (
          <HoverCard>
            <HoverCardTrigger>
              <div className="relative">
                <img
                  src={leetcode}
                  alt="leetcode"
                  className={`w-6 cursor-pointer transition-transform`}
                  onClick={() => {
                    window.open(`https://leetcode.com/u/${platforms.leetcode}/`);
                  }}
                />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="flex items-center justify-between gap-1 w-fit">
              {platforms.leetcode}
            </HoverCardContent>
          </HoverCard>
        )}
        {platforms.codeforces && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-2 py-0.5 rounded">
              CodeForces
            </span>
            <span className="text-sm">{platforms.codeforces}</span>
          </div>
        )}
        {platforms.codechef && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100 px-2 py-0.5 rounded">
              CodeChef
            </span>
            <span className="text-sm">{platforms.codechef}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(PlatformCard);
