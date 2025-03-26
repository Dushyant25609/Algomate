import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { FC } from 'react';

export const VisibilityTab: FC = () => {
  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Visibility</h2>
            <p className="text-muted-foreground text-sm">Control who can see your profile.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Public Profile</h3>
                <p className="text-xs text-muted-foreground">Allow others to view your profile</p>
              </div>
              <div className="flex items-center">
                <Switch defaultChecked id="public-profile" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Show Email</h3>
                <p className="text-xs text-muted-foreground">Display your email on your profile</p>
              </div>
              <div className="flex items-center">
                <Switch id="show-email" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Show Social Links</h3>
                <p className="text-xs text-muted-foreground">Display your social media links</p>
              </div>
              <div className="flex items-center">
                <Switch defaultChecked id="show-social" />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Show Platform Stats</h3>
                <p className="text-xs text-muted-foreground">
                  Display your coding platform statistics
                </p>
              </div>
              <div className="flex items-center">
                <Switch defaultChecked id="show-platform-stats" />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Update</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
