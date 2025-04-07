import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { cn } from '@/lib/utils';

const LegendItem = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const StyledText = styled('text')(() => ({
  fill: 'var(--card-foreground)',
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 40,
  fontWeight: 700,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <>
      <StyledText x={left + width / 2} y={top + height / 2}>
        {children}
      </StyledText>
    </>
  );
}

interface ChartData {
  value: number;
  label: string;
  color?: string;
}

export interface PieChartProps {
  ChartValues: ChartData[];
  COLORS: string[];
  height: number;
  width: number;
  innerRadius: number;
  outerRadius: number;
  className?: string;
}

function Legend({ data = [] }: { data: ChartData[] }) {
  const [hover, setHover] = React.useState<number>(-1);
  // Ensure data is an array before processing
  const safeData = Array.isArray(data) ? data : [];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <div className="flex md:flex-col gap-2 md:gap-5">
        {safeData.map((item, index) => (
          <LegendItem className="w-16 md:w-20" key={index}>
            <Typography
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(-1)}
              borderColor={item.color}
              color={item.color}
              fontWeight={hover === index ? 'bold' : 'normal'}
              className={cn(
                'border w-full  rounded-sm transition-colors duration-500 md:px-3 py-2 flex items-center justify-center',
                item.label === 'Easy' ? 'bg-[#08d1b9]/20 hover:bg-[#08d1b9]/40' : '', // Replace with a valid color
                item.label === 'Medium' ? 'bg-[#FDBF1E]/20 hover:bg-[#FDBF1E]/40' : '',
                item.label === 'Hard' ? 'bg-[#FF375F]/20 hover:bg-[#FF375F]/40' : '',
                item.label === 'CP' ? 'bg-[#C05AF2]/20 hover:bg-[#C05AF2]/40' : '',
                item.label === 'Leetcode' ? 'bg-[#FFA217]/20 hover:bg-[#FFA217]/40' : ''
              )}
              variant="body2"
            >
              {hover === index ? item.value : item.label}
            </Typography>
          </LegendItem>
        ))}
      </div>
    </Box>
  );
}

export default function PieChartWithCenterLabel({
  ChartValues,
  COLORS,
  height,
  width,
  innerRadius,
  outerRadius,
  className,
}: PieChartProps) {
  // Ensure ChartValues is always an array
  const safeChartValues = Array.isArray(ChartValues) ? ChartValues : [];

  const totalQuestions =
    safeChartValues.length > 0
      ? safeChartValues.reduce((sum, item) => sum + (item?.value || 0), 0)
      : 0;
  const size = {
    width: width,
    height: height,
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className={cn('flex flex-col items-center gap-5', className)}>
        <PieChart
          margin={{
            left: 30,
            right: 30,
            top: 30,
            bottom: 30,
          }}
          colors={COLORS}
          series={[
            {
              data: safeChartValues,
              innerRadius: innerRadius,
              outerRadius: outerRadius,
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
          ]}
          {...size}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        >
          <PieCenterLabel>{totalQuestions}</PieCenterLabel>
        </PieChart>
        <Legend data={safeChartValues} />
      </div>
    </Box>
  );
}
