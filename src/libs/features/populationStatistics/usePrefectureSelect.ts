import { useEffect } from 'react';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

import { create } from 'zustand';

import { Prefecture } from '@/libs/resas/prefectures';

import { colors } from './PopulationsChart/colors';

export type PrefectureLegend = { code: number; label: string; color: string };

type PrefectureSelectStore = {
  selected: PrefectureLegend[];
  initialized: boolean;
  addPrefecture: (pref: Prefecture) => void;
  removePrefecture: (pref: Prefecture) => void;
};

const createPrefectureLegend = (pref: Prefecture, i: number): PrefectureLegend => ({
  code: pref.prefCode,
  label: pref.prefName,
  color: colors[i % 12],
});

export const usePrefectureSelect = create<PrefectureSelectStore>((set) => ({
  selected: [],
  initialized: false,
  addPrefecture: (pref: Prefecture) =>
    set((state) => ({
      selected: [...state.selected, createPrefectureLegend(pref, state.selected.length)],
    })),
  removePrefecture: (pref: Prefecture) =>
    set((state) => ({
      selected: state.selected.filter((_) => _.code !== pref.prefCode),
    })),
}));

export const useSyncPrefCode = (prefectures: Prefecture[]) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!usePrefectureSelect.getState().initialized) {
    const prefCodes = searchParams.getAll('prefCode');
    usePrefectureSelect.setState({
      selected: prefectures
        .filter((pref) => prefCodes.includes(String(pref.prefCode)))
        .map(createPrefectureLegend),
      initialized: true,
    });
  }

  useEffect(() => {
    const syncSearchParams = (state: PrefectureSelectStore) => {
      const params = new URLSearchParams(searchParams);
      params.delete('prefCode');
      state.selected.forEach((pref) => params.append('prefCode', String(pref.code)));

      if (params.toString() !== searchParams.toString()) {
        router.push(pathname.concat('?', params.toString()), { scroll: false });
      }
    };

    const unsubscribe = usePrefectureSelect.subscribe(syncSearchParams);
    return unsubscribe;
  }, [searchParams, pathname, router]);
};
