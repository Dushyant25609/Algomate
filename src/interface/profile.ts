import { AvatarConfig, AvatarConfig2 } from './avatar';
import { GithubUserData } from './github';
import { LeetCodeUserData } from './leetcode';
import { Questions } from './questions';
import { User } from './user';

export interface Profile {
  github: GithubUserData;
  code: Code;
}

export interface Code {
  leetcode: LeetCodeUserData;
  questions: Questions;
}

export interface PublicProfile {
  github: GithubUserData;
  code: Code;
  user: User;
  avatar: AvatarConfig | AvatarConfig2;
  public: boolean;
}
