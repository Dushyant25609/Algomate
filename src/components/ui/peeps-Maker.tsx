import { peepOptions } from '@/constants/peeps';
import { ArrowLeft, ArrowRight, Palette } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import Peep, { AccessoryType, FaceType, HairType, FacialHairType } from 'react-peeps';
import {
  CarouselControlProps,
  AvatarConfig,
  Background,
  BodyType,
  GradientBackground,
} from '@/interface/avatar';
import { cn } from '@/lib/utils';
import { HexColorPicker } from 'react-colorful';
import { Button } from './button';

const CarouselControl = <T,>({ label, options, value, onChange }: CarouselControlProps<T>) => {
  const currentIndex = options.indexOf(value);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target as Node)) {
        setShowColorPicker(false);
      }
    };

    if (showColorPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showColorPicker]);

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
    onChange(options[newIndex]);
  };

  const handleNext = () => {
    const newIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
    onChange(options[newIndex]);
  };

  const handleColorChange = (color: string) => {
    if (label === 'Background') {
      if (typeof value === 'string') {
        onChange(color as T);
      } else {
        onChange({ from: color, to: (value as GradientBackground).to } as unknown as T);
      }
    }
  };

  const handleGradientToColorChange = (color: string) => {
    if (label === 'Background' && typeof value !== 'string') {
      onChange({ from: (value as GradientBackground).from, to: color } as T);
    }
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  return (
    <div className="flex items-center gap-2.5 py-4 relative">
      <span className="w-24">{label}:</span>
      <button onClick={handlePrev} className="cursor-pointer">
        <ArrowLeft />
      </button>
      {label === 'Background' ? (
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'w-30 h-5 rounded border border-gray-300',
              typeof value === 'string' ? '' : ''
            )}
            style={{
              background:
                typeof value === 'string'
                  ? value
                  : `linear-gradient(to right, ${(value as GradientBackground).from}, ${(value as GradientBackground).to})`,
            }}
          />
          <button
            onClick={toggleColorPicker}
            className="cursor-pointer p-1 hover:bg-gray-100 rounded"
            title="Custom Color"
          >
            <Palette size={16} />
          </button>
          {showColorPicker && (
            <div
              ref={colorPickerRef}
              className="absolute z-10 bg-secondary p-6 rounded-md shadow-lg left-0 top-0 "
            >
              <div className="flex flex-col gap-2">
                {typeof value !== 'string' && (
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="text-xs ">From:</div>
                      <HexColorPicker
                        color={(value as GradientBackground).from}
                        onChange={handleColorChange}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-xs">To:</div>
                      <HexColorPicker
                        color={(value as GradientBackground).to}
                        onChange={handleGradientToColorChange}
                      />
                    </div>
                  </div>
                )}
                {typeof value === 'string' && (
                  <HexColorPicker color={value as string} onChange={handleColorChange} />
                )}
                <Button variant={'ghost'} onClick={toggleColorPicker}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <span className="w-30 text-center">{value as string}</span>
      )}
      <button onClick={handleNext} className="cursor-pointer">
        <ArrowRight />
      </button>
    </div>
  );
};

interface ShowcaseProps {
  avatarConfig: AvatarConfig;
  onAvatarChange: (config: AvatarConfig) => void;
}

const Showcase: React.FC<ShowcaseProps> = ({ avatarConfig, onAvatarChange }) => {
  const handleChange = (key: keyof AvatarConfig, value: string | Background) => {
    onAvatarChange({ ...avatarConfig, [key]: value });
  };

  const handleBackgroundTypeChange = (isGradient: boolean) => {
    const newBackground = isGradient
      ? peepOptions.gradientBackgrounds[0]
      : peepOptions.solidBackgrounds[0];
    onAvatarChange({ ...avatarConfig, background: newBackground });
  };

  const backgroundStyle =
    typeof avatarConfig.background === 'object'
      ? `linear-gradient(45deg, ${avatarConfig.background.from}, ${avatarConfig.background.to})`
      : avatarConfig.background;

  return (
    <div className="flex flex-col md:flex-row md:justify-around w-full gap-6 items-center p-5">
      <div className="flex justify-center h-full">
        <div className="relative w-[300px] h-[300px] flex justify-center items-center ">
          <div
            className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] flex-col items-center rounded-full overflow-hidden"
            style={{ background: backgroundStyle }}
          >
            <Peep
              accessory={avatarConfig.accessory}
              body={avatarConfig.body}
              face={avatarConfig.face}
              hair={avatarConfig.hair}
              facialHair={avatarConfig.facialHair}
              strokeColor="black"
              viewBox={{ x: '-120', y: '0', width: '1150', height: '1200' }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col divide-y-2">
        <div className="flex items-center gap-5 my-2.5">
          <span className="w-24">Background Type:</span>
          <label className="cursor-pointer mr-2.5">
            <input
              type="radio"
              checked={typeof avatarConfig.background === 'object'}
              onChange={() => handleBackgroundTypeChange(true)}
            />
            Gradient
          </label>
          <label className="cursor-pointer">
            <input
              type="radio"
              checked={typeof avatarConfig.background === 'string'}
              onChange={() => handleBackgroundTypeChange(false)}
            />
            Solid
          </label>
        </div>
        <CarouselControl<Background>
          label="Background"
          options={
            typeof avatarConfig.background === 'object'
              ? peepOptions.gradientBackgrounds
              : peepOptions.solidBackgrounds
          }
          value={avatarConfig.background}
          onChange={value => handleChange('background', value)}
        />
        <CarouselControl<AccessoryType>
          label="Accessory"
          options={peepOptions.accessories as AccessoryType[]}
          value={avatarConfig.accessory}
          onChange={value => handleChange('accessory', value)}
        />
        <CarouselControl<BodyType>
          label="Body"
          options={peepOptions.bodies as BodyType[]}
          value={avatarConfig.body}
          onChange={value => handleChange('body', value)}
        />
        <CarouselControl<FaceType>
          label="Face"
          options={peepOptions.faces as FaceType[]}
          value={avatarConfig.face}
          onChange={value => handleChange('face', value)}
        />
        <CarouselControl<HairType>
          label="Hair"
          options={peepOptions.hair as HairType[]}
          value={avatarConfig.hair}
          onChange={value => handleChange('hair', value)}
        />
        <CarouselControl<FacialHairType>
          label="Facial Hair"
          options={peepOptions.facialHair as FacialHairType[]}
          value={avatarConfig.facialHair}
          onChange={value => handleChange('facialHair', value)}
        />
      </div>
    </div>
  );
};

export default Showcase;
