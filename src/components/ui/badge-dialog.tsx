import { FC, useState } from 'react';
import { badge } from '@/interface/leetcode';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AwardIcon, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BadgeDialogProps {
  badges: badge[];
}

const BadgeDialog: FC<BadgeDialogProps> = ({ badges }) => {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          <span>View All</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <AwardIcon className="h-6 w-6 text-accent" />
            Badges Collection
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {badges.map(badge => (
            <div
              key={badge.displayName}
              className="flex flex-col items-center justify-center p-4 rounded-lg border bg-secondary/10 hover:bg-secondary/20 transition-all duration-300"
              onMouseEnter={() => setHover(badge.displayName)}
              onMouseLeave={() => setHover(null)}
            >
              <div className="relative w-24 h-24 flex items-center justify-center mb-2">
                {hover === badge.displayName ? (
                  <div className="relative">
                    {/* Background Icon */}
                    {badge.medal.config.iconGifBackground && (
                      <img
                        className="absolute top-0 left-0 w-full h-full object-contain opacity-50"
                        src={
                          badge.medal.config.iconGifBackground?.includes('leetcode.com')
                            ? badge.medal.config.iconGifBackground
                            : `https://leetcode.com${badge.medal.config.iconGifBackground}`
                        }
                        alt=""
                      />
                    )}
                    {/* Foreground Icon */}
                    <img
                      className="relative z-10 h-20 transition-all duration-500 object-contain"
                      src={
                        badge.medal.config.iconGif?.includes('leetcode.com')
                          ? badge.medal.config.iconGif
                          : `https://leetcode.com${badge.medal.config.iconGif}`
                      }
                      alt={badge.displayName}
                    />
                  </div>
                ) : (
                  <img
                    className="h-20 brightness-75 transition-all duration-500 object-contain"
                    src={
                      badge.icon?.includes('leetcode.com')
                        ? badge.icon
                        : `https://leetcode.com${badge.icon}`
                    }
                    alt={badge.displayName}
                  />
                )}
              </div>
              <h3 className={cn('text-center font-medium')}>{badge.displayName}</h3>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BadgeDialog;
