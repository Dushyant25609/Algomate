import {
  AccessoryType,
  StandingPoseType,
  BustPoseType,
  SittingPoseType,
  FaceType,
  HairType,
  FacialHairType,
} from 'react-peeps';

export interface GradientBackground {
  from: string;
  to: string;
}

export type Background = string | GradientBackground;

export type BodyType = StandingPoseType | BustPoseType | SittingPoseType;

export interface AvatarConfig {
  background: Background;
  accessory: AccessoryType;
  body: BodyType;
  face: FaceType;
  hair: HairType;
  facialHair: FacialHairType;
}

export interface AvatarConfig2 {
  backgrounds: Background;
  accessories: AccessoryType;
  bodies: BodyType;
  faces: FaceType;
  hair: HairType;
  facialHair: FacialHairType;
}

export interface CarouselControlProps<T> {
  label: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
}
