'use server';
import dynamic from 'next/dynamic';

import { fetchPrefectures } from '@/libs/resas/prefectures';
import { heading } from '@/libs/styles/heading.css';
import { fetchPopulationsParallel } from '@/libs/resas/populations';
import { PrefectureSelector } from './PrefectureSelector';
import { prefectureSelectSection, revertSp } from './PopulationStatistics.css';

const PopulationChart = dynamic(() => import('./PopulationsChart'), { ssr: false });

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
    <section className={revertSp}>
      <section className={prefectureSelectSection}>
        <h2 className={heading({ as: 'h3' })}>都道府県を選択</h2>
        <PrefectureSelector prefectureOptions={prefectures} />
      </section>
      <PopulationChart populationLabel="総人口" populations={populations} />
    </section>
  );
};
