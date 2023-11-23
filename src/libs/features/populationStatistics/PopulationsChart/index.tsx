'use client';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import { PopulationLabel, PopulationsMap } from '@/libs/resas/populations';
import { years } from './years';
import { usePrefectureSelect } from '../usePrefectureSelect';
import { useMemo } from 'react';

type Props = {
  populations: PopulationsMap;
  populationLabel: PopulationLabel;
};

const populationByYear = (
  populations: PopulationsMap,
  prefCodes: number[],
  year: number,
  label: PopulationLabel,
) => {
  return {
    name: String(year),
    ...Object.fromEntries(
      prefCodes.map((code) => [
        code,
        populations[code]?.data
          .find((_) => _.label === label)
          ?.data?.find((_) => _.year === year)?.value,
      ]),
    ),
  };
};

const PopulationChart = ({ populations, populationLabel }: Props) => {
  const selected = usePrefectureSelect((state) => state.selected);
  const prefCodes = selected.map((_) => _.code);
  const data = years.map((year) =>
    populationByYear(populations, prefCodes, year, populationLabel),
  );

  const width = useMemo(() => {
    if (typeof window === 'undefined') return 1000;
    return Math.min(screen.width * 0.9, 1000);
  }, []);
  const isSp = width < 800;
  const margin = isSp ? 10 : 50;
  const height = isSp ? width * 0.8 : width / 2;

  return (
    <LineChart
      data={data}
      width={width}
      height={height}
      margin={{ top: margin + 50, left: margin, right: margin, bottom: margin + 50 }}
    >
      <XAxis dataKey="name" />
      {!isSp && (
        <YAxis
          tick={({
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
          }}
        />
      )}
      {selected.map((pref) => (
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
