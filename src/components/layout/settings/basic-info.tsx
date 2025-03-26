import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User } from '@/interface/user';
import { Cog } from 'lucide-react';
import { FC } from 'react';

interface BasicInfoTabProps {
  user: User;
}

export const BasicInfoTab: FC<BasicInfoTabProps> = ({ user }) => {
  return (
    <Card className="shadow-md">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">Basic Info</h2>
            <p className="text-muted-foreground text-sm">You can manage your details here.</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Basic Details</h3>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="relative mb-2 sm:mb-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary/20 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold text-primary">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-background border border-input rounded-full p-1 shadow-sm hover:bg-accent transition-colors">
                    <Cog className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-1 text-center sm:text-left">
                  <p className="text-sm font-medium">
                    Codiolio Id: <span className="text-primary">{user.username || 'username'}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    First Name <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Input
                    defaultValue={user.name?.split(' ')[0] || ''}
                    className="transition-all focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    defaultValue={user.name?.split(' ')[1] || ''}
                    className="transition-all focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium">Email</label>
                <Input
                  defaultValue={user.email || ''}
                  className="transition-all focus:border-primary"
                />
              </div>

              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium">Bio (Max 200 Characters)</label>
                <textarea
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px] transition-all focus:border-primary"
                  maxLength={200}
                  placeholder="Tell us about yourself"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center">
                  Country <span className="text-red-500 ml-1">*</span>
                </label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:border-primary">
                  <option value="">Select your country</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Educational Details</h3>

              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium">College</label>
                <Input placeholder="Enter your college name" />
              </div>

              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium">
                  Degree <span className="text-red-500">*</span>
                </label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="Bachelor of Technology">Bachelor of Technology</option>
                  <option value="Bachelor of Science">Bachelor of Science</option>
                  <option value="Master of Technology">Master of Technology</option>
                  <option value="Master of Science">Master of Science</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>

              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium">
                  Branch <span className="text-red-500">*</span>
                </label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="Computer Science">Computer Science</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Year of Graduation <span className="text-red-500">*</span>
                </label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </select>
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
