import UserAvatar from '@/components/ui/avatar/user-avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { User } from '@/interface/user';
import { Cog } from 'lucide-react';
import { FC } from 'react';

interface BasicInfoTabProps {
  user: User;
  country: string[];
}

export const BasicInfoTab: FC<BasicInfoTabProps> = ({ user, country }) => {
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
                <div className="relative">
                  <UserAvatar classname="w-20 h-20 sm:w-28 sm:h-28" />
                  <button className="absolute bottom-0 right-0 bg-background border border-input rounded-full p-1 shadow-sm hover:bg-accent transition-colors">
                    <Cog className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-1 text-center sm:text-left">
                  <p className="text-sm font-medium">
                    Algomate Id: <span className="text-primary">{user.username || 'username'}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium  flex items-center">
                    Full Name <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Input
                    defaultValue={user.name || ''}
                    className="transition-all focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    Country <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Select>
                    <SelectTrigger className="w-full h-10">Select your country</SelectTrigger>
                    <SelectContent>
                      {country.map(country => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <label className="text-sm font-medium">Bio (Max 200 Characters)</label>
                <textarea
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px] transition-all focus:border-primary"
                  maxLength={200}
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>

            <div className="">
              <h3 className="text-lg font-medium ">Educational Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 ">
                  <label className="text-sm font-medium">College</label>
                  <Input placeholder="Enter your college name" />
                </div>

                <div className="space-y-2 ">
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

                <div className="space-y-2 ">
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
          </div>

          <div className="flex justify-end">
            <Button>Update</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
