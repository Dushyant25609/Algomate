import { FC, memo } from 'react';
import { Card } from '../ui/card';
import AreaChartComponent, { LineChartProps } from '../ui/chart/area-chart';
import { cn } from '@/lib/utils';

interface Props extends LineChartProps {
  ChartValues: LineChartProps['ChartValues'];
  className?: string;
  rating: number;
  globalRanking: number;
  totalParticipants: number;
  attended: number;
}

const LineChart: FC<Props> = ({
  ChartValues,
  className,
  rating,
  globalRanking,
  totalParticipants,
  attended,
}) => {
  return (
    <Card
      className={cn(
        'w-full h-full md:w-full xl:max-w-fit gap-0 px-4 py-0 flex justify-center',
        className
      )}
    >
      <span className="grow" />
      <div className="flex justify-between md:justify-start md:gap-12 pt-4 md:px-3">
        <div className="flex flex-col text-card-foreground">
          <h2 className="text-xs font-light brightness-50">Contest Rating</h2>
          <p className="text-3xl ">{rating}</p>
        </div>
        <div className="flex flex-col gap-1 text-card-foreground">
          <h2 className="text-xs font-light brightness-50">Global Ranking</h2>
          <p className="text-xs">
            {globalRanking}
            <span className="brightness-50">/{totalParticipants}</span>
          </p>
        </div>
        <div className="flex flex-col gap-1 text-card-foreground">
          <h2 className="text-xs font-light brightness-50">Attended</h2>
          <p className="text-xs">{attended}</p>
        </div>
      </div>
      <AreaChartComponent
        className="hidden md:flex"
        height={180}
        width={350}
        ChartValues={ChartValues}
      />
      <AreaChartComponent
        className="flex md:hidden"
        height={100}
        width={30}
        ChartValues={ChartValues}
      />
      <span className="grow" />
    </Card>
  );
};

export default memo(LineChart);
