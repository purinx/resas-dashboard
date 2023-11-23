import { PopulationLabel, PopulationsMap } from '@/libs/resas/populations';
import { usePrefectureSelect } from '../usePrefectureSelect';
import { years } from './years';

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

export const useNormalizedPopulationData = (
  populations: PopulationsMap,
  populationLabel: PopulationLabel,
) => {
  const selected = usePrefectureSelect((state) => state.selected);
  const prefCodes = selected.map((_) => _.code);
  const data = years.map((year) =>
    populationByYear(populations, prefCodes, year, populationLabel),
  );

  return { data, lines: selected };
};
