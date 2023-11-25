import { ComponentProps } from 'react';

import { button } from './Checkbox.css';

type Props = ComponentProps<'button'>;

export const CheckboxButton = (props: Props) => {
  return <button className={button} {...props} />;
};
