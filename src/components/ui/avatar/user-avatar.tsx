import { Avatar, AvatarFallback } from '@/components/ui/avatar/avatar';
import { useAppSelector } from '@/store';
import { FC, lazy, memo, Suspense, useMemo } from 'react';
import { Loader } from '@/components/ui/loader';
import { AvatarConfig, AvatarConfig2 } from '@/interface/avatar';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Lazy load the Peep component to improve initial load time
const Peep = lazy(() => import('react-peeps'));

interface UserAvatarProps {
  classname?: string;
  roundness?: string;
  onClick?: () => void;
  route?: string;
  publicAvatar?: AvatarConfig | AvatarConfig2;
}

const UserAvatar: FC<UserAvatarProps> = ({
  classname,
  roundness,
  onClick,
  route,
  publicAvatar,
}) => {
  // Memoize the selector to prevent unnecessary re-renders
  let avatar = useAppSelector(state => state.avatar?.avatarConfig) as AvatarConfig2;
  if (publicAvatar) {
    avatar = publicAvatar as AvatarConfig2;
  }
  const loading = useAppSelector(state => state.avatar?.loading);
  const navigate = useNavigate();
  roundness = roundness || 'rounded-full';
  // Memoize the background style calculation to prevent recalculation on each render
  const backgroundStyle = useMemo(() => {
    return avatar?.backgrounds
      ? typeof avatar.backgrounds === 'object'
        ? `linear-gradient(45deg, ${avatar.backgrounds.from}, ${avatar.backgrounds.to})`
        : avatar.backgrounds
      : '#e2e8f0'; // Default background color
  }, [avatar?.backgrounds]);
  return (
    <Avatar
      className={cn('overflow-visible', classname)}
      onClick={() => {
        onClick?.();
        navigate(`/dashboard/${route}`);
      }}
    >
      <div className="relative w-full h-full flex justify-center items-center">
        {loading ? (
          <AvatarFallback>
            <Loader size="sm" variant="primary" />
          </AvatarFallback>
        ) : (
          <div
            className={cn('w-full h-full flex-col items-center overflow-hidden', roundness)}
            style={{ background: backgroundStyle }}
          >
            <Suspense fallback={<Loader size="sm" variant="primary" />}>
              <Peep
                accessory={avatar?.accessories}
                body={avatar?.bodies}
                face={avatar?.faces}
                hair={avatar?.hair}
                facialHair={avatar?.facialHair}
                strokeColor="black"
                viewBox={{ x: '-120', y: '0', width: '1150', height: '1200' }}
              />
            </Suspense>
          </div>
        )}
      </div>
    </Avatar>
  );
};

export default memo(UserAvatar);
