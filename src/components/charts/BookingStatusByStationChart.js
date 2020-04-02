import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useTheme } from '@xstyled/emotion';
import Box from '../primitives/Box';
import { TRIP_MAX_BOOKINGS } from '../../constants';

export default function BookingStatusByStationChart({ data, ...props }) {
  const {
    colors: { textDark: textDarkColor, text: textColor }
  } = useTheme();

  return (
    <Box {...props}>
      <ResponsiveBar
        data={data}
        keys={['pickups', 'dropoffs']}
        indexBy="station"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        theme={{
          tooltip: { color: textDarkColor },
          grid: { line: { stroke: textColor } },
          textColor: textColor
        }}
        maxValue={TRIP_MAX_BOOKINGS}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        fill={[
          {
            match: {
              id: 'pickups'
            },
            id: 'dots'
          },
          {
            match: {
              id: 'dropoffs'
            },
            id: 'lines'
          }
        ]}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Station',
          legendPosition: 'middle',
          legendOffset: 32
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Bookings',
          legendPosition: 'middle',
          legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            itemTextColor: textColor,
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 60,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </Box>
  );
}
