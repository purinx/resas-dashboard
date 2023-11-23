'use client';
import dynamic from 'next/dynamic';

import { Prefecture } from '@/libs/resas/prefectures';
import { usePrefectureSelect, useSyncPrefCode } from '../usePrefectureSelect';
import * as classes from './PrefectureSelector.css';

const Checkbox = dynamic(() => import('@/libs/components/controls/Checkbox'), {
  ssr: false,
});

type Props = {
  prefectureOptions: Prefecture[];
};

export const PrefectureSelector = ({ prefectureOptions }: Props) => {
  const { selected, addPrefecture, removePrefecture } = usePrefectureSelect();
  useSyncPrefCode();

  const getIsSelected = (prefCode: number) =>
    selected.findIndex((_) => _.code === prefCode) > -1;
  const getOnChange = (pref: Prefecture) => (checked: boolean) => {
    const addOrRemove = checked ? addPrefecture : removePrefecture;
    addOrRemove(pref);
  };

  return (
    <div className={classes.checkBoxGrid}>
      {prefectureOptions.map((option) => (
        <Checkbox
          bg={selected.find((_) => _.code === option.prefCode)?.color}
          key={option.prefCode}
          onChange={getOnChange(option)}
          checked={getIsSelected(option.prefCode)}
        >
          {option.prefName}
        </Checkbox>
      ))}
    </div>
  );
};
