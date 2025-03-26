import React, { useState } from 'react';
import Showcase from '@/components/ui/peeps-Maker';
import { AvatarConfig, BodyType } from '@/interface/avatar';
import { peepOptions } from '@/constants/peeps';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AccessoryType, FaceType, FacialHairType, HairType } from 'react-peeps';
import { useAppDispatch } from '@/store';
import { AvatarAction } from '@/store/slices/avatarSlice';
import { Shuffle } from 'lucide-react';

const CreateAvatar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>({
    background: peepOptions.solidBackgrounds[0],
    accessory: peepOptions.accessories[0] as AccessoryType,
    body: peepOptions.bodies[0] as BodyType,
    face: peepOptions.faces[0] as FaceType,
    hair: peepOptions.hair[0] as HairType,
    facialHair: peepOptions.facialHair[0] as FacialHairType,
  });

  const handleAvatarChange = (newConfig: AvatarConfig) => {
    setAvatarConfig(newConfig);
  };

  const handleSave = async () => {
    try {
      dispatch(AvatarAction(avatarConfig));
      navigate('/profile');
    } catch (error) {
      console.error('Failed to save avatar:', error);
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
    <div className="h-screen   backdrop-blur-xs  md:inset-0 absolute z-50 w-full flex items-center justify-center ">
      <Card className="w-full  md:w-10/12">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-accent-foreground">
            Create Your Avatar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <Showcase avatarConfig={avatarConfig} onAvatarChange={handleAvatarChange} />
            <div className="self-end w-full md:w-1/2 flex flex-col md:flex-row gap-2">
              <Button
                variant="secondary"
                onClick={handleRandomize}
                className="flex-1"
                title="Generate Random Avatar"
              >
                <Shuffle className="mr-2 h-4 w-4" />
                Random
              </Button>
              <Button variant="secondary" onClick={handleSave} className="flex-1">
                Save Avatar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAvatar;
