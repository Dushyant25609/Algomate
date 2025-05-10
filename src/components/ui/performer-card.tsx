import * as React from 'react';
import { cn } from '@/lib/utils';
import { AvatarConfig, AvatarConfig2 } from '@/interface/avatar';
import NoBgAvatar from './avatar/no-bg-avatar';
import { CardBody, CardContainer, CardItem } from './3d-card';

interface PerformerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  username: string;
  score: number;
  rank?: string;
  avatar?: AvatarConfig | AvatarConfig2;
}

export function PerformerCard({
  username,
  score,
  rank = 'Top Solver',
  avatar,
  className,
  onClick,
  ...props
}: PerformerCardProps) {
  return (
    <div className="cursor-pointer w-full" onClick={onClick}>
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-medium text-foreground mb-2 brightness-50">
          {rank[0].toUpperCase()}
          {rank.slice(1)}
        </h3>
        <CardContainer
          className={cn('bg-card relative p-0 flex items-center rounded-xl w-full', className)}
          {...props}
        >
          <CardBody className="flex items-center w-full">
            <CardItem
              translateZ={80}
              rotateX={10}
              translateX={-5}
              rotateZ={-7}
              className="w-full h-full"
            >
              {avatar && <NoBgAvatar classname="w-32" publicAvatar={avatar} />}
            </CardItem>
            <CardItem
              translateZ={100}
              translateX={-15}
              className="flex flex-col justify-center p-4"
            >
              <span className="text-3xl font-bold text-accent">
                {Math.round(score).toLocaleString()}
              </span>
              <span className="text-gray-400">{username}</span>
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
}
