'use client';
import dynamic from 'next/dynamic';

import { PopulationLabel } from '@/libs/resas/populations';

import { usePopulationLabelSelect } from '../usePopulationLabelSelect';
import { populationLabelSelect } from './PopulationLabelSelector.css';

const Checkbox = dynamic(() => import('@/libs/components/controls/Checkbox'), {
  ssr: false,
});
const options: PopulationLabel[] = ['総人口', '年少人口', '生産年齢人口', '老年人口'];

export const PopulationLabelSelector = () => {
  const { selected, setSelected } = usePopulationLabelSelect();

  const getOnChange = (label: PopulationLabel) => (checked: boolean) => {
    if (!checked) return;
    setSelected(label);
  };

  return (
    <div data-testid="PopulationLabelSelector" className={populationLabelSelect}>
      {options.map((label) => (
        <Checkbox checked={selected === label} key={label} onChange={getOnChange(label)}>
          {label}
        </Checkbox>
      ))}
    </div>
  );
};
