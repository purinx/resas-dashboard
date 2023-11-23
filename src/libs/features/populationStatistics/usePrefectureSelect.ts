import { create } from 'zustand';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Prefecture } from '@/libs/resas/prefectures';
import { colors } from './PopulationsChart/colors';
import { useEffect } from 'react';

export type PrefectureLegend = { code: number; label: string; color: string };

type PrefectureSelectStore = {
  selected: PrefectureLegend[];
  addPrefecture: (pref: Prefecture) => void;
  removePrefecture: (pref: Prefecture) => void;
};

const createPrefectureLegend = (pref: Prefecture, i: number): PrefectureLegend => ({
  code: pref.prefCode,
  label: pref.prefName,
  color: colors[i % 16],
});

export const usePrefectureSelect = create<PrefectureSelectStore>((set, get) => ({
  selected: [],
  prefCodes: get()?.selected?.map((_) => _.code) ?? [],
  addPrefecture: (pref: Prefecture) =>
    set((state) => ({
      selected: [...state.selected, createPrefectureLegend(pref, state.selected.length)],
    })),
  removePrefecture: (pref: Prefecture) =>
    set((state) => ({
      selected: state.selected.filter((_) => _.code !== pref.prefCode),
    })),
}));

export const useSyncPrefCode = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    usePrefectureSelect.subscribe((state) => {
      const params = new URLSearchParams(searchParams);
      params.delete('prefCode');
      state.selected.forEach((pref) => params.append('prefCode', String(pref.code)));

      if (params.toString() !== searchParams.toString()) {
        router.push(pathname.concat('?', params.toString()));
      }
    });
  }, [searchParams, pathname, router]);
};
