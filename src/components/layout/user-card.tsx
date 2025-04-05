import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import UserAvatar from '@/components/ui/avatar/user-avatar';
import { Platform } from '@/interface/platform';
import { Social } from '@/interface/social';
import { User, Trophy } from 'lucide-react';
import SocialCard from '../ui/social-card';
import PlatformCard from '../ui/platform-card';
import { copyToClipboard } from '@/lib/hook';
import { AvatarConfig, AvatarConfig2 } from '@/interface/avatar';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '@/motion/user-card';
import UserInfo from '../ui/user-info';
import { GithubUserData } from '@/interface/github';
import GithubUserCard from '../ui/github-user-card';

interface UserCardProps {
  name: string;
  username: string;
  platforms: Platform;
  socials: Social;
  userLevel: string;
  github?: GithubUserData;
  publicAvatar?: AvatarConfig | AvatarConfig2;
  country?: string;
  bio?: string;
  city?: string;
  company?: string;
  college?: string;
}

const UserCard: FC<UserCardProps> = ({
  name,
  username,
  userLevel,
  platforms,
  socials,
  publicAvatar,
  country = '',
  bio = '',
  city = '',
  company = '',
  college = '',
  github,
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="md:max-w-fit"
      variants={containerVariants}
    >
      <Card className="md:max-w-fit h-full px-2 lg:px-4 py-0 pt-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col divide-y">
          <div className="flex flex-col pb-3">
            <motion.div variants={itemVariants}>
              <CardHeader className="flex flex-row items-center justify-between pb-4 gap-10">
                <UserAvatar
                  publicAvatar={publicAvatar}
                  classname="w-24 h-24 md:w-32 md:h-30 aspect-square"
                  roundness="rounded-xl"
                />
                <div className="flex flex-col space-y-3 flex-1">
                  <div className="flex flex-col">
                    <CardTitle className="text-lg md:text-2xl font-bold">{name}</CardTitle>
                    <CardDescription
                      onClick={() => copyToClipboard(username)}
                      className="flex items-center text-xs font-thin md:font-light gap-1 cursor-pointer"
                    >
                      <User className="h-3 w-3 md:h-4 md:w-4" />
                      <p>{username}</p>
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center max-w-fit gap-1 text-xs text-muted-foreground bg-accent/30 px-2 py-0.5 md:px-4 md:py-1 rounded-full shadow-sm">
                      <Trophy className="w-3 h-3 md:h-4 md:w-4 text-amber-500" />
                      <span>{userLevel}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </motion.div>
          </div>

          {(bio || country || city || company || college) && (
            <motion.div variants={itemVariants}>
              <CardContent className="grow p-4 max-w-md">
                <UserInfo
                  country={country}
                  city={city}
                  bio={bio}
                  college={college}
                  company={company}
                />
              </CardContent>
            </motion.div>
          )}

          {(platforms['leetcode'] ||
            platforms['gfg'] ||
            platforms['codeforces'] ||
            platforms['codechef'] ||
            platforms['codeStudio']) && (
            <motion.div variants={itemVariants}>
              <CardContent className="grow p-4">
                <PlatformCard platforms={platforms} />
              </CardContent>
            </motion.div>
          )}

          {(socials.email ||
            socials.gitHub ||
            socials.linkedIn ||
            socials.portfolio ||
            socials.x) && (
            <motion.div variants={itemVariants}>
              <CardContent className="grow p-4 ">
                <SocialCard socials={socials} />
              </CardContent>
            </motion.div>
          )}
          {github && (
            <motion.div variants={itemVariants}>
              <CardContent className="grow p-4 ">
                <GithubUserCard github={github} />
              </CardContent>
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default UserCard;
