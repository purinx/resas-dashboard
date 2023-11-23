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
          ?.data?.find((_) => _.year === year),
      ]),
    ),
  };
};

export const PopulationChart = ({ populations, populationLabel }: Props) => {
  const selected = usePrefectureSelect((state) => state.selected);
  const prefCodes = selected.map((_) => _.code);
  const data = years.map((year) =>
    populationByYear(populations, prefCodes, year, populationLabel),
  );

  const width = useMemo(() => {
    if (typeof window === 'undefined') return 1000;
    return Math.min(screen.width - 40, 1000);
  }, []);

  return (
    <LineChart data={data} width={width} height={width}>
      {selected.map((pref) => (
        <Line key={pref.code} dataKey={String(pref.code)} stroke={pref.color} />
      ))}
    </LineChart>
  );
};

export default PopulationChart;
