import { ComponentProps } from 'react';

import { label } from './Checkbox.css';

type Props = ComponentProps<'label'>;

export const CheckboxLabel = (props: Props) => {
  return <label className={label} {...props} />;
};
