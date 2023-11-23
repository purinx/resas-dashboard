'use server';

import { fetchPrefectures } from '@/libs/resas/prefectures';
import { PrefectureSelector } from './PrefectureSelector';
import { heading } from '@/libs/styles/heading.css';

export const PopulationStatistics = async () => {
  const prefectures = await fetchPrefectures();

  return (
    <section>
      <h2 className={heading({ as: 'h2' })}>人口構成グラフ</h2>
      <section>
        <h3 className={heading({ as: 'h3' })}>都道府県を選択</h3>
        <PrefectureSelector prefectureOptions={prefectures} />
      </section>
    </section>
  );
};
