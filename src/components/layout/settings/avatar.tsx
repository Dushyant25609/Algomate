import { FC, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import UserAvatar from '@/components/ui/avatar/user-avatar';
import { useAppDispatch, useAppSelector } from '@/store';
import { updateAvatarRequest } from '@/store/slices/avatarSlice';
import { AvatarConfig, AvatarConfig2, BodyType } from '@/interface/avatar';
import { AccessoryType, FaceType, FacialHairType, HairType } from 'react-peeps';
import { peepOptions } from '@/constants/peeps';
import Showcase from '@/components/ui/peeps-Maker';
import { Shuffle } from 'lucide-react';
import { toast } from 'sonner';

export const AvatarTab: FC = () => {
  const dispatch = useAppDispatch();
  const currentAvatar = useAppSelector(state => state.avatar?.avatarConfig) as AvatarConfig2;
  const loading = useAppSelector(state => state.avatar?.loading);

  // Convert AvatarConfig2 to AvatarConfig for the Showcase component
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>({
    background: currentAvatar?.backgrounds || peepOptions.solidBackgrounds[0],
    accessory: currentAvatar?.accessories || (peepOptions.accessories[0] as AccessoryType),
    body: currentAvatar?.bodies || (peepOptions.bodies[0] as BodyType),
    face: currentAvatar?.faces || (peepOptions.faces[0] as FaceType),
    hair: currentAvatar?.hair || (peepOptions.hair[0] as HairType),
    facialHair: currentAvatar?.facialHair || (peepOptions.facialHair[0] as FacialHairType),
  });

  const handleAvatarChange = (newConfig: AvatarConfig) => {
    setAvatarConfig(newConfig);
  };

  const handleSave = async () => {
    try {
      dispatch(updateAvatarRequest(avatarConfig));
      toast.success('Avatar updated successfully!');
    } catch (error) {
      toast.error('Failed to update avatar');
      console.error('Failed to update avatar:', error);
    }
  };

  const getRandomItem = <T,>(items: T[]): T => {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  };

  const handleRandomize = () => {
    // Randomly decide between gradient and solid background
    const useGradient = Math.random() > 0.5;
    const randomBackground = useGradient
      ? getRandomItem(peepOptions.gradientBackgrounds)
      : getRandomItem(peepOptions.solidBackgrounds);

    const newConfig: AvatarConfig = {
      background: randomBackground,
      accessory: getRandomItem(peepOptions.accessories) as AccessoryType,
      body: getRandomItem(peepOptions.bodies) as BodyType,
      face: getRandomItem(peepOptions.faces) as FaceType,
      hair: getRandomItem(peepOptions.hair) as HairType,
      facialHair: getRandomItem(peepOptions.facialHair) as FacialHairType,
    };

    setAvatarConfig(newConfig);
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">Avatar</h2>
            <p className="text-muted-foreground text-sm">Customize your avatar appearance.</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-6">
              <UserAvatar classname="w-24 h-24 sm:w-32 sm:h-32" />
            </div>

            <Showcase avatarConfig={avatarConfig} onAvatarChange={handleAvatarChange} />

            <div className="self-end w-full md:w-1/2 flex flex-col md:flex-row gap-2 mt-4">
              <Button
                variant="outline"
                onClick={handleRandomize}
                className="flex-1"
                title="Generate Random Avatar"
                disabled={loading}
              >
                <Shuffle className="mr-2 h-4 w-4" />
                Random
              </Button>
              <Button variant="outline" onClick={handleSave} className="flex-1" disabled={loading}>
                {loading ? 'Updating...' : 'Update Avatar'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
