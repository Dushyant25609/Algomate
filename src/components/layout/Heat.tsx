import { FC, memo, useState } from 'react';
import Heatmap from '../ui/chart/heatmap';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';
import { SmartSelect } from '../ui/smart-select';

interface HeatmapProps {
  submissionCalendar?: string;
  className?: string;
  activeDays: number;
  maxStreak: number;
  activeYears: number[];
}

const HeatMap: FC<HeatmapProps> = ({
  submissionCalendar,
  className,
  activeDays,
  maxStreak,
  activeYears,
}) => {
  const [value, setValue] = useState('2025');
  return (
    <Card
      className={cn(
        'md:flex w-full justify-center gap-1 items-center px-6 py-2 overflow-x-scroll',
        className
      )}
    >
      <div className="flex w-full items-center justify-between overflow-x-scroll">
        <div className="flex px-4 gap-4 text-xs items-center">
          <p>
            <span className="brightness-50">Total Active Days:</span>{' '}
            <span className="text-sm">{activeDays}</span>
          </p>
          <p>
            <span className="brightness-50">Max Streak:</span>{' '}
            <span className="text-sm">{maxStreak}</span>
          </p>
        </div>
        <SmartSelect
          value={value}
          placeholder="Current year"
          options={activeYears.map(year => {
            return {
              value: year.toString(),
              label: year.toString(),
            };
          })}
          onValueChange={function (value: string): void {
            setValue(value);
          }}
        />
      </div>
      <Heatmap year={value} submissionCalendar={submissionCalendar || ''} />
    </Card>
  );
};

export default memo(HeatMap);
