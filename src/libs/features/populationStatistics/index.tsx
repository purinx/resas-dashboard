'use server';

import { fetchPrefectures } from '@/libs/resas/prefectures';
import { heading } from '@/libs/styles/heading.css';
import { fetchPopulationsParallel } from '@/libs/resas/populations';
import { PrefectureSelector } from './PrefectureSelector';
import { PopulationChart } from './PopulationsChart';

type Props = {
  searchParams: NextSearchParams;
};

export const PopulationStatistics = async ({ searchParams }: Props) => {
  const prefectures = await fetchPrefectures();
  const prefCodes = (() => {
    if (Array.isArray(searchParams.prefCode)) {
      return searchParams.prefCode.map((_) => Number(_));
    }
    if (!isNaN(Number(searchParams.prefCode))) {
      return [Number(searchParams.prefCode)];
    }
    return [];
  })();
  const populations = await fetchPopulationsParallel(prefCodes);

  return (
    <section>
      <h2 className={heading({ as: 'h2' })}>人口構成グラフ</h2>
      <section>
        <h3 className={heading({ as: 'h3' })}>都道府県を選択</h3>
        <PrefectureSelector prefectureOptions={prefectures} />
        <PopulationChart populationLabel="総人口" populations={populations} />
      </section>
    </section>
  );
};
