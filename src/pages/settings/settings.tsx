import { FC, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserProvider, useUserContext } from '@/provider/data-provider';
import { Code, User, Eye, Lock, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlatformTab } from '@/components/layout/settings/platform';
import { BasicInfoTab } from '@/components/layout/settings/basic-info';
import { AccountsTab } from '@/components/layout/settings/account';
import { SocialsTab } from '@/components/layout/settings/social';
import { VisibilityTab } from '@/components/layout/settings/visibility';

type SettingsTab = 'basic' | 'socials' | 'platform' | 'visibility' | 'accounts';

const SettingsPage: FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('basic');
  const user = useUserContext();

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
      {/* Page Header - Mobile Only */}
      <div className="md:hidden w-full mb-4">
        <div className="flex items-center gap-2 mb-4">
          <SettingsIcon className="h-5 w-5" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full md:w-1/4 lg:w-1/5 sticky top-4 h-fit">
        <Card className="shadow-md">
          <CardContent className="p-0">
            <nav className="flex flex-col">
              <button
                onClick={() => setActiveTab('basic')}
                className={cn(
                  'flex items-center gap-3 p-4 text-sm font-medium transition-colors hover:bg-accent',
                  activeTab === 'basic' ? 'bg-accent text-foreground' : 'text-muted-foreground'
                )}
              >
                <User className="h-4 w-4" />
                Basic Info
              </button>
              <button
                onClick={() => setActiveTab('socials')}
                className={cn(
                  'flex items-center gap-3 p-4 text-sm font-medium transition-colors hover:bg-accent',
                  activeTab === 'socials' ? 'bg-accent text-foreground' : 'text-muted-foreground'
                )}
              >
                <Code className="h-4 w-4" />
                Socials
              </button>
              <button
                onClick={() => setActiveTab('platform')}
                className={cn(
                  'flex items-center gap-3 p-4 text-sm font-medium transition-colors hover:bg-accent',
                  activeTab === 'platform' ? 'bg-accent text-foreground' : 'text-muted-foreground'
                )}
              >
                <Code className="h-4 w-4" />
                Platform
              </button>
              <button
                onClick={() => setActiveTab('visibility')}
                className={cn(
                  'flex items-center gap-3 p-4 text-sm font-medium transition-colors hover:bg-accent',
                  activeTab === 'visibility' ? 'bg-accent text-foreground' : 'text-muted-foreground'
                )}
              >
                <Eye className="h-4 w-4" />
                Visibility
              </button>
              <button
                onClick={() => setActiveTab('accounts')}
                className={cn(
                  'flex items-center gap-3 p-4 text-sm font-medium transition-colors hover:bg-accent',
                  activeTab === 'accounts' ? 'bg-accent text-foreground' : 'text-muted-foreground'
                )}
              >
                <Lock className="h-4 w-4" />
                Accounts
              </button>
            </nav>
          </CardContent>
        </Card>
      </div>

      {/* Content Area */}
      <div className="w-full md:w-3/4 lg:w-4/5">
        {activeTab === 'basic' && <BasicInfoTab user={user} />}
        {activeTab === 'socials' && <SocialsTab user={user} />}
        {activeTab === 'platform' && <PlatformTab user={user} />}
        {activeTab === 'visibility' && <VisibilityTab />}
        {activeTab === 'accounts' && <AccountsTab />}
      </div>
    </div>
  );
};

const Settings = () => {
  return (
    <UserProvider>
      <SettingsPage />
    </UserProvider>
  );
};

export default Settings;
