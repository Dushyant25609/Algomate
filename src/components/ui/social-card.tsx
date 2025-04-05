import { Social } from '@/interface/social';
import { copyToClipboard } from '@/lib/hook';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@radix-ui/react-hover-card';
import { Github, Globe, X } from 'lucide-react';
import linkedIn from '@/assets/linkedin.svg';
import mail from '@/assets/mail.svg';
import { FC, memo } from 'react';

interface SocialCardProps {
  socials: Social;
}

const SocialCard: FC<SocialCardProps> = ({ socials }) => {
  return (
    <div>
      <div className="flex justify-center items-center gap-4">
        {socials.email && (
          <HoverCard>
            <HoverCardTrigger>
              <div className="relative">
                <img
                  src={mail}
                  alt="mail"
                  onClick={() => copyToClipboard(socials.email || '')}
                  className="h-6 cursor-pointer transition-transform"
                />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="flex items-center justify-between gap-1 w-fit">
              {socials.email}
            </HoverCardContent>
          </HoverCard>
        )}
        {socials.gitHub && (
          <HoverCard>
            <HoverCardTrigger>
              <div className="relative">
                <Github
                  onClick={() => window.open(socials.gitHub || '', '_blank')}
                  className="h-6 w-6 cursor-pointer transition-transform"
                />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="flex items-center justify-between gap-1 w-fit">
              {socials.gitHub}
            </HoverCardContent>
          </HoverCard>
        )}
        {socials.linkedIn && (
          <HoverCard>
            <HoverCardTrigger>
              <div className="relative">
                <img
                  onClick={() => window.open(socials.linkedIn || '', '_blank')}
                  alt="linkedIn"
                  src={linkedIn}
                  className="w-8 cursor-pointer transition-transform"
                />
              </div>
            </HoverCardTrigger>
          </HoverCard>
        )}
        {socials.portfolio && (
          <HoverCard>
            <HoverCardTrigger>
              <div className="relative">
                <Globe
                  onClick={() => window.open(socials.portfolio || '', '_blank')}
                  className="h-6 w-6 cursor-pointer transition-transform"
                />
              </div>
            </HoverCardTrigger>
          </HoverCard>
        )}
        {socials.x && (
          <HoverCard>
            <HoverCardTrigger>
              <div className="relative">
                <X
                  onClick={() => window.open(socials.x || '', '_blank')}
                  className="h-6 w-6 cursor-pointer transition-transform"
                />
              </div>
            </HoverCardTrigger>
          </HoverCard>
        )}
      </div>
    </div>
  );
};

export default memo(SocialCard);
