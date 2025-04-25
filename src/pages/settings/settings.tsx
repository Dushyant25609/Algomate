import { FC, memo, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code, User as UserIcon, Image } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlatformTab } from '@/components/layout/settings/platform';
import BasicInfoTab from '@/components/layout/settings/basic-info';
import SocialsTab from '@/components/layout/settings/social';
import { AvatarTab } from '@/components/layout/settings/avatar';
import { motion, AnimatePresence } from 'framer-motion';
import {
  settingsContainerProps,
  tabNavigationProps,
  activeTabIndicatorProps,
  tabContentVariants,
  tabButtonHoverProps,
} from '@/motion/settings-animations';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchCountriesRequest } from '@/store/slices/countrySlice';
import { User } from '@/interface/user';
import { UpdateUserAction } from '@/store/slices/userSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { AppRoutes } from '@/lib/routes';

type SettingsTab = 'basic' | 'socials' | 'platform' | 'avatar';

const SettingsPage: FC = () => {
  const tab = useParams().tab as SettingsTab;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user) as User;
  const country = useAppSelector(state => state.country.countries);
  const handleSubmit = (values: Partial<User>) => {
    dispatch(UpdateUserAction(values));
  };

  useEffect(() => {
    if (!country.length) {
      dispatch(fetchCountriesRequest());
    }
  }, [country, dispatch]);

  return (
    <motion.div
      className="container max-w-4xl mx-auto px-4 py-8 flex gap-6"
      {...settingsContainerProps}
    >
      {/* Navigation - Horizontal on desktop, Vertical on mobile */}
      <div className="w-48 flex-shrink-0 sticky top-4 z-10 flex justify-center">
        <Card className="shadow-md p-0 w-full h-fit">
          <CardContent className="p-0">
            <motion.nav className="flex flex-col divide-y divide-border/20" {...tabNavigationProps}>
              <motion.button
                onClick={() => navigate(AppRoutes.BASE_SETTINGS + 'basic')}
                className={cn(
                  'flex items-center gap-3 p-4 text-sm font-medium transition-colors rounded-t-2xl hover:bg-accent/50 relative',
                  tab === 'basic' ? 'text-primary font-semibold' : 'text-muted-foreground'
                )}
                {...tabButtonHoverProps}
              >
                <UserIcon className="h-4 w-4" />
                Basic Info
                {tab === 'basic' && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary md:bottom-0 md:top-auto"
                    {...activeTabIndicatorProps}
                  />
                )}
              </motion.button>
              <motion.button
                onClick={() => navigate(AppRoutes.BASE_SETTINGS + 'socials')}
                className={cn(
                  'flex items-center gap-3 p-4 text-sm font-medium transition-colors hover:bg-accent/50 relative',
                  tab === 'socials' ? 'text-primary font-semibold' : 'text-muted-foreground'
                )}
                {...tabButtonHoverProps}
              >
                <Code className="h-4 w-4" />
                Socials
                {tab === 'socials' && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary md:bottom-0 md:top-auto"
                    {...activeTabIndicatorProps}
                  />
                )}
              </motion.button>
              <motion.button
                onClick={() => navigate(AppRoutes.BASE_SETTINGS + 'platform')}
                className={cn(
                  'flex items-center gap-3 p-4 text-sm font-medium transition-colors hover:bg-accent/50 relative',
                  tab === 'platform' ? 'text-primary font-semibold' : 'text-muted-foreground'
                )}
                {...tabButtonHoverProps}
              >
                <Code className="h-4 w-4" />
                Platform
                {tab === 'platform' && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary md:bottom-0 md:top-auto"
                    {...activeTabIndicatorProps}
                  />
                )}
              </motion.button>
              <motion.button
                onClick={() => navigate(AppRoutes.BASE_SETTINGS + 'avatar')}
                className={cn(
                  'flex items-center gap-3 p-4 text-sm rounded-b-2xl font-medium transition-colors hover:bg-accent/50 relative',
                  tab === 'avatar' ? 'text-primary font-semibold' : 'text-muted-foreground'
                )}
                {...tabButtonHoverProps}
              >
                <Image className="h-4 w-4" />
                Avatar
                {tab === 'avatar' && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary "
                    {...activeTabIndicatorProps}
                  />
                )}
              </motion.button>
            </motion.nav>
          </CardContent>
        </Card>
      </div>

      {/* Content Area */}
      <div className="w-full bg-background/60 backdrop-blur-sm rounded-lg">
        <AnimatePresence mode="wait">
          {tab === 'basic' && (
            <motion.div
              key="basic"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
              className="p-1"
            >
              <BasicInfoTab onSubmit={handleSubmit} country={country} user={user} />
            </motion.div>
          )}
          {tab === 'socials' && (
            <motion.div
              key="socials"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
              className="p-1"
            >
              <SocialsTab onSubmit={handleSubmit} user={user} />
            </motion.div>
          )}
          {tab === 'platform' && (
            <motion.div
              key="platform"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
              className="p-1"
            >
              <PlatformTab user={user} />
            </motion.div>
          )}
          {tab === 'avatar' && (
            <motion.div
              key="avatar"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
              className="p-1"
            >
              <AvatarTab />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default memo(SettingsPage);
