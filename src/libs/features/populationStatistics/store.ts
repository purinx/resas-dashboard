import { create } from 'zustand';
import uniq from 'lodash.uniq';

type PrefectureStore = {
  prefCodes: number[];
  addPrefecture: (prefCode: number) => void;
  removePrefecture: (prefCode: number) => void;
};

export const usePrefectureStore = create<PrefectureStore>((set) => ({
  prefCodes: [],
  addPrefecture: (prefCode: number) =>
    set((state) => ({ prefCodes: uniq([...state.prefCodes, prefCode]) })),
  removePrefecture: (prefCode: number) =>
    set((state) => ({
      prefCodes: state.prefCodes.filter((pref) => pref !== prefCode),
    })),
}));
