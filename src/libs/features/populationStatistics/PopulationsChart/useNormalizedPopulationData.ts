import { PopulationLabel, PopulationsMap } from '@/libs/resas/populations';

import { usePrefectureSelect } from '../usePrefectureSelect';
import { years } from './years';
import { usePopulationLabelSelect } from '../usePopulationLabelSelect';

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

export const useNormalizedPopulationData = (populations: PopulationsMap) => {
  const prefLines = usePrefectureSelect((state) => state.selected);
  const populationLabel = usePopulationLabelSelect((state) => state.selected);
  const prefCodes = prefLines.map((_) => _.code);
  const data = years.map((year) =>
    populationByYear(populations, prefCodes, year, populationLabel),
  );

  return { data, lines: prefLines };
};
