'use client';

import { Prefecture } from '@/libs/resas/prefectures';
import { Checkbox } from '@/libs/components/controls/Checkbox';
import { usePrefectureStore } from '../store';
import * as classes from './PrefectureSelector.css';

type Props = {
  prefectureOptions: Prefecture[];
};

export const PrefectureSelector = ({ prefectureOptions }: Props) => {
  const { prefCodes, addPrefecture, removePrefecture } = usePrefectureStore();

  const getSelected = (prefCode: number) => prefCodes.includes(prefCode);
  const getOnChange = (prefCode: number) => (checked: boolean) => {
    const addOrRemove = checked ? addPrefecture : removePrefecture;
    addOrRemove(prefCode);
  };

  return (
    <div className={classes.checkBoxGrid}>
      {prefectureOptions.map((option) => (
        <Checkbox
          key={option.prefCode}
          onChange={getOnChange(option.prefCode)}
          checked={getSelected(option.prefCode)}
        >
          {option.prefName}
        </Checkbox>
      ))}
    </div>
  );
};
