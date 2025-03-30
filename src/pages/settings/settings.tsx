import { FC, memo, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Code, User as UserIcon, Settings as SettingsIcon, Image } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlatformTab } from '@/components/layout/settings/platform';
import { BasicInfoTab } from '@/components/layout/settings/basic-info';
import { SocialsTab } from '@/components/layout/settings/social';
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

type SettingsTab = 'basic' | 'socials' | 'platform' | 'avatar';

const SettingsPage: FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('basic');
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user) as User;
  const country = useAppSelector(state => state.country.countries);

  useEffect(() => {
    if (!country.length) {
      dispatch(fetchCountriesRequest());
    }
  }, [country, dispatch]);

  return (
    <motion.div
      className="container max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6"
      {...settingsContainerProps}
    >
      {/* Page Header */}
      <div className="w-full mb-6">
        <div className="flex items-center gap-2 mb-2">
          <SettingsIcon className="h-5 w-5 text-primary" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Manage your account preferences and profile information
        </p>
      </div>

      {/* Navigation - Horizontal on desktop, Vertical on mobile */}
      <div className="w-full sticky top-4 z-10">
        <Card className="shadow-md border-muted/30">
          <CardContent className="p-0">
            <motion.nav
              className="flex flex-col md:flex-row md:items-center md:justify-start divide-y md:divide-y-0 md:divide-x divide-border"
              {...tabNavigationProps}
            >
              <motion.button
                onClick={() => setActiveTab('basic')}
                className={cn(
                  'flex items-center gap-3 p-4 text-sm font-medium transition-colors hover:bg-accent/50 relative',
                  activeTab === 'basic' ? 'text-primary font-semibold' : 'text-muted-foreground'
                )}
                {...tabButtonHoverProps}
              >
                <UserIcon className="h-4 w-4" />
                Basic Info
                {activeTab === 'basic' && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary md:bottom-0 md:top-auto"
                    {...activeTabIndicatorProps}
                  />
                )}
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('socials')}
                className={cn(
                  'flex items-center gap-3 p-4 text-sm font-medium transition-colors hover:bg-accent/50 relative',
                  activeTab === 'socials' ? 'text-primary font-semibold' : 'text-muted-foreground'
                )}
                {...tabButtonHoverProps}
              >
                <Code className="h-4 w-4" />
                Socials
                {activeTab === 'socials' && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary md:bottom-0 md:top-auto"
                    {...activeTabIndicatorProps}
                  />
                )}
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('platform')}
                className={cn(
                  'flex items-center gap-3 p-4 text-sm font-medium transition-colors hover:bg-accent/50 relative',
                  activeTab === 'platform' ? 'text-primary font-semibold' : 'text-muted-foreground'
                )}
                {...tabButtonHoverProps}
              >
                <Code className="h-4 w-4" />
                Platform
                {activeTab === 'platform' && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary md:bottom-0 md:top-auto"
                    {...activeTabIndicatorProps}
                  />
                )}
              </motion.button>
              <motion.button
                onClick={() => setActiveTab('avatar')}
                className={cn(
                  'flex items-center gap-3 p-4 text-sm font-medium transition-colors hover:bg-accent/50 relative',
                  activeTab === 'avatar' ? 'text-primary font-semibold' : 'text-muted-foreground'
                )}
                {...tabButtonHoverProps}
              >
                <Image className="h-4 w-4" />
                Avatar
                {activeTab === 'avatar' && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary md:bottom-0 md:top-auto"
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
          {activeTab === 'basic' && (
            <motion.div
              key="basic"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
              className="p-1"
            >
              <BasicInfoTab country={country} user={user} />
            </motion.div>
          )}
          {activeTab === 'socials' && (
            <motion.div
              key="socials"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={tabContentVariants}
              className="p-1"
            >
              <SocialsTab user={user} />
            </motion.div>
          )}
          {activeTab === 'platform' && (
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
          {activeTab === 'avatar' && (
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
