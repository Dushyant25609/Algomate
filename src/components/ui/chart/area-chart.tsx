import Chart from 'react-apexcharts';
import { Box } from '@mui/material';
import React from 'react';
import { ApexOptions } from 'apexcharts';
import { cn } from '@/lib/utils';

interface ChartData {
  value: number;
  label: string;
}

export interface LineChartProps {
  ChartValues: ChartData[];
}

const options = {
  chart: {
    type: 'area' as const,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: true,
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800,
      animateGradually: {
        enabled: true,
        delay: 150,
      },
      dynamicAnimation: {
        enabled: true,
        speed: 500,
      },
    },
    background: 'transparent',
  },
  colors: ['var(--primary)'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'monotoneCubic',
    width: 3,
  },
  fill: {
    type: 'gradient',
    colors: ['var(--muted-foreground)'],
    gradient: {
      shadeIntensity: 1,
      inverseColors: true,
      opacityFrom: 0.6,
      opacityTo: 0,
      stops: [0, 90, 100],
    },
  },
  xaxis: {
    show: false,
    labels: {
      style: {
        colors: 'var(--card-foreground)',
      },
      show: false,
    },
    axisBorder: {
      color: 'var(--card-foreground)',
      show: false,
    },
    axisTicks: {
      color: 'var(--card-foreground)',
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  tooltip: {
    theme: 'dark',
    x: {
      show: false,
    },
  },
  grid: {
    borderColor: 'var(--border)',
    strokeDashArray: 4,
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: {
          height: 300,
          width: '100%',
        },
      },
    },
  ],
};

interface ChartData {
  value: number;
  label: string;
}

interface AreaChartProps {
  ChartValues: ChartData[];
  height: number;
  width: number;
  className?: string;
}

const AreaChartComponent: React.FC<AreaChartProps> = ({
  ChartValues = [],
  height,
  width,
  className,
}) => {
  // Validate and filter out invalid data points
  const validChartValues = ChartValues.filter(
    item => item && typeof item.value === 'number' && !isNaN(item.value) && item.label
  );

  // Generate series data from ChartValues
  // For area charts with time series, we need to format the data properly
  // We'll create a single series with all data points
  const series = [
    {
      name: 'Rating',
      data: validChartValues.map(item => ({
        x: item.label,
        y: item.value,
      })),
    },
  ];
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className={cn('flex flex-col md:flex-row items-center', className)}>
        <Chart
          options={options as ApexOptions}
          series={series}
          type="area"
          height={height}
          width={width}
        />
      </div>
    </Box>
  );
};

export default AreaChartComponent;
