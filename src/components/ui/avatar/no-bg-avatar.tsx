import { Avatar } from '@/components/ui/avatar/avatar';
import { useAppSelector } from '@/store';
import { FC, lazy, memo, Suspense } from 'react';
import { Loader } from '@/components/ui/loader';
import { AvatarConfig, AvatarConfig2 } from '@/interface/avatar';
import { cn } from '@/lib/utils';

// Lazy load the Peep component to improve initial load time
const Peep = lazy(() => import('react-peeps'));

interface NoBgAvatarProps {
  classname?: string;
  onClick?: () => void;
  publicAvatar?: AvatarConfig | AvatarConfig2;
}

const NoBgAvatar: FC<NoBgAvatarProps> = ({ classname, onClick, publicAvatar }) => {
  // Memoize the selector to prevent unnecessary re-renders
  let avatar = useAppSelector(state => state.avatar?.avatarConfig) as AvatarConfig2;
  if (publicAvatar) {
    avatar = publicAvatar as AvatarConfig2;
  }
  return (
    <Avatar
      className={cn('overflow-visible h-full', classname)}
      onClick={() => {
        onClick?.();
      }}
    >
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="w-full h-full flex-col items-center ">
          <Suspense fallback={<Loader size="sm" variant="primary" />}>
            <Peep
              accessory={avatar?.accessories}
              body={avatar?.bodies}
              face={avatar?.faces}
              hair={avatar?.hair}
              facialHair={avatar?.facialHair}
              strokeColor="black"
              viewBox={{ x: '-120', y: '-120', width: '1150', height: '1200' }}
            />
          </Suspense>
        </div>
      </div>
    </Avatar>
  );
};

export default memo(NoBgAvatar);
