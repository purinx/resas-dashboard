'use server';

import { fetchPrefectures } from '@/libs/resas/prefectures';
import { PrefectureSelector } from './PrefectureSelector';

export const PopulationStatistics = async () => {
  const prefectures = await fetchPrefectures();

  return (
    <section>
      <h2>人口構成グラフ</h2>
      <section>
        <h3>都道府県を選択</h3>
        <PrefectureSelector prefectureOptions={prefectures} />
      </section>
    </section>
  );
};
