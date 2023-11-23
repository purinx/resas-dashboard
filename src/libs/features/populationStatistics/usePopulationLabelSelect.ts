import { create } from 'zustand';
import { PopulationLabel } from '@/libs/resas/populations';

type PopulationLabelSelectStore = {
  selected: PopulationLabel;
  setSelected: (label: PopulationLabel) => void;
};

export const usePopulationLabelSelect = create<PopulationLabelSelectStore>((set) => ({
  selected: '総人口',
  setSelected: (label) => set({ selected: label }),
}));
