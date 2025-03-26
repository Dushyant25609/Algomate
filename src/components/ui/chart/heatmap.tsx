import React, { useMemo } from 'react';
import { format, eachDayOfInterval, fromUnixTime, addDays, startOfYear, endOfYear } from 'date-fns';
import { ActivityCalendar, ThemeInput } from 'react-activity-calendar';
import { Tooltip as MuiTooltip } from '@mui/material';

const explicitTheme: ThemeInput = {
  light: [
    'var(--heatmap-base)',
    'var(--heatmap-1)',
    'var(--heatmap-2)',
    'var(--heatmap-3)',
    'var(--heatmap-4)',
  ],
  dark: [
    'var(--heatmap-base)',
    'var(--heatmap-1)',
    'var(--heatmap-2)',
    'var(--heatmap-3)',
    'var(--heatmap-4)',
  ],
};

interface HeatmapProps {
  submissionCalendar?: string;
  year: string;
}

interface SubmissionDay {
  date: string;
  count: number;
  level: number;
}

function convertUnixTimestampToDate(timestamp: number): string {
  return format(fromUnixTime(timestamp), 'yyyy-MM-dd'); // Fixed format
}

function generateYearlySubmissionData(
  year: number,
  submissionCalendar: Record<string, number>
): SubmissionDay[] {
  const startDate = startOfYear(new Date(year, 0, 1));
  const endDate = endOfYear(startDate);
  const daysArray: SubmissionDay[] = [];

  // Convert timestamps in submissionCalendar to formatted date keys
  const formattedSubmissionData: Record<string, number> = Object.keys(submissionCalendar).reduce(
    (acc, key) => {
      const date = convertUnixTimestampToDate(parseInt(key, 10));
      acc[date] = submissionCalendar[key];
      return acc;
    },
    {} as Record<string, number>
  );

  // Generate full-year dataset
  for (let currentDate = startDate; currentDate <= endDate; currentDate = addDays(currentDate, 1)) {
    const formattedDate = format(currentDate, 'yyyy-MM-dd');
    let level;
    if (formattedSubmissionData[formattedDate] < 1) level = 0;
    else if (formattedSubmissionData[formattedDate] < 3) level = 1;
    else if (formattedSubmissionData[formattedDate] < 5) level = 2;
    else if (formattedSubmissionData[formattedDate] < 10) level = 3;
    daysArray.push({
      date: formattedDate,
      count: formattedSubmissionData[formattedDate] || 0,
      level: level || 0,
    });
  }

  return daysArray;
}

const SubmissionHeatmap: React.FC<HeatmapProps> = ({ submissionCalendar, year }) => {
  // Parse submissionCalendar JSON into heatmap data
  const heatmapData = useMemo(() => {
    const startDate = startOfYear(new Date()); // Changed from subMonths(new Date(), 6) to show full year from January
    const endDate = endOfYear(new Date());

    // Default dataset with all days initialized
    const allDays = eachDayOfInterval({ start: startDate, end: endDate }).map(date => ({
      date: format(date, 'yyyy-MM-dd'),
      count: 0,
      level: 0,
    }));

    if (!submissionCalendar) return allDays;

    try {
      const calendarData = JSON.parse(submissionCalendar);
      if (!calendarData || typeof calendarData !== 'object') {
        console.error('Invalid submission calendar data format');
        return allDays;
      }

      return generateYearlySubmissionData(parseInt(year), calendarData);
    } catch (error) {
      console.error('Error parsing submission calendar data:', error);
      return allDays;
    }
  }, [submissionCalendar, year]);

  return (
    <ActivityCalendar
      blockMargin={3}
      fontSize={12}
      maxLevel={4}
      weekStart={0}
      blockRadius={2}
      blockSize={9}
      data={heatmapData
        .filter(day => day.date.includes(year))
        .map(day => ({
          date: day.date,
          count: day.count,
          level: day.level,
        }))}
      theme={explicitTheme}
      renderBlock={(block, activity) => (
        <MuiTooltip title={`${activity.count} submissions on ${activity.date}`}>{block}</MuiTooltip>
      )}
      hideColorLegend
    />
  );
};

export default SubmissionHeatmap;
