import { FC, memo } from 'react';
import { Card } from '../ui/card';
import Pie, { PieChartProps } from '../ui/chart/Pie-chart';
import { cn } from '@/lib/utils';
import { LightbulbIcon } from 'lucide-react';

interface Props {
  QuestionsChartValues: PieChartProps['ChartValues'];
  PlatformChartValues: PieChartProps['ChartValues'];
  COLORS: PieChartProps['COLORS'];
  className?: string;
}

const PieChart: FC<Props> = ({ QuestionsChartValues, PlatformChartValues, COLORS, className }) => {
  return (
    <Card className={cn('lg:max-w-full items-center justify-center', className)}>
      <span className="grow" />
      <div className="flex items-center gap-2 self-start px-2 text-2xl font-medium text-card-foreground">
        <LightbulbIcon className="h-7 w-7 text-accent" />
        <h2>Problems Solved </h2>
      </div>
      <div className="flex flex-col gap-3 md:gap-0 lg:flex-row lg:gap-4 lg:justify-around w-full">
        <Pie
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={80}
          ChartValues={QuestionsChartValues}
          COLORS={COLORS}
          className="md:flex-row"
        />
        <span className="border" />
        <Pie
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={80}
          ChartValues={PlatformChartValues}
          COLORS={COLORS}
          className=" md:flex-row-reverse"
        />
      </div>
      <span className="grow" />
    </Card>
  );
};

export default memo(PieChart);
