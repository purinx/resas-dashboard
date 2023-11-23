'use client';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { ComponentProps, useMemo } from 'react';

import { PopulationLabel, PopulationsMap } from '@/libs/resas/populations';
import { useNormalizedPopulationData } from './useNormalizedPopulationData';
import { BaseAxisProps } from 'recharts/types/util/types';
import { chartWrapper } from './PopulationChart.css';

type Props = {
  populations: PopulationsMap;
  populationLabel: PopulationLabel;
};

const PopulationChart = ({ populations, populationLabel }: Props) => {
  const { data, lines } = useNormalizedPopulationData(populations, populationLabel);
  const width = useMemo(() => {
    if (typeof window === 'undefined') return 1000;
    return Math.min(screen.width * 0.9, 1000);
  }, []);
  const isSp = width < 800;
  const margin = isSp ? 10 : 50;
  const height = isSp ? width * 0.8 : width / 2;

  return (
    <LineChart
      className={chartWrapper}
      data={data}
      width={width}
      height={height}
      margin={{ top: margin, left: margin, right: margin, bottom: margin }}
    >
      <XAxis dataKey="name" />
      {!isSp && <YAxis tick={renderYTick} />}
      {lines.map((pref) => (
        <Line
          key={pref.code}
          dataKey={String(pref.code)}
          type="monotone"
          stroke={pref.color}
        />
      ))}
    </LineChart>
  );
};

export default PopulationChart;

const renderYTick: BaseAxisProps['tick'] = ({
  payload,
  tickFormatter,
  visibleTicksCount,
  verticalAnchor,
  y,
  ...props
}) => {
  return (
    <text {...props} y={y + 5}>
      {payload.value / 10000}万人
    </text>
  );
};
