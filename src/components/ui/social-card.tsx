import { Social } from '@/interface/social';
import { copyToClipboard } from '@/lib/hook';
import { Mail, Github, Linkedin, Globe } from 'lucide-react';
import { FC, memo } from 'react';

interface SocialCardProps {
  socials: Social;
}

const SocialCard: FC<SocialCardProps> = ({ socials }) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-2">
        {socials.email && (
          <div
            className="flex items-center gap-2 cursor-copy"
            onClick={() => {
              copyToClipboard(socials.email || '');
            }}
          >
            <Mail className="h-4 w-4 text-blue-500" />
            <span className="text-sm">{socials.email}</span>
          </div>
        )}
        {socials.gitHub && (
          <div
            className="flex items-center gap-2 cursor-copy"
            onClick={() => {
              copyToClipboard(socials.gitHub || '');
            }}
          >
            <Github className="h-4 w-4 text-gray-700 dark:text-gray-300" />
            <span className="text-sm">{socials.gitHub}</span>
          </div>
        )}
        {socials.linkedIn && (
          <div
            className="flex items-center gap-2 cursor-copy"
            onClick={() => {
              copyToClipboard(socials.linkedIn || '');
            }}
          >
            <Linkedin className="h-4 w-4 text-blue-600" />
            <span className="text-sm">{socials.linkedIn}</span>
          </div>
        )}
        {socials.portfolio && (
          <div
            className="flex items-center gap-2 cursor-copy"
            onClick={() => {
              copyToClipboard(socials.portfolio || '');
            }}
          >
            <Globe className="h-4 w-4 text-green-500" />
            <span className="text-sm">{socials.portfolio}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(SocialCard);
