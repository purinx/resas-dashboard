import { ReactNode, useId, useRef } from 'react';
import { CheckIcon } from '@radix-ui/react-icons';

import { CheckboxLabel } from './CheckboxLabel';
import { CheckboxButton } from './CheckboxButton';
import { icon } from './Checkbox.css';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  bg?: string;
};

export const Checkbox = ({ checked, onChange, children, bg }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const id = useId();

  return (
    <CheckboxLabel htmlFor={id}>
      <CheckboxButton
        style={{ backgroundColor: bg && `${bg}50` }}
        id={id}
        role="checkbox"
        aria-checked={checked}
        onClick={() => {
          if (!ref.current) return;
          ref.current.click();
        }}
      >
        <CheckIcon className={icon} aria-hidden={!checked} />
      </CheckboxButton>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        aria-hidden="true"
        style={{ display: 'none' }}
        onChange={(e) => onChange(e.target.checked)}
      />
      {children}
    </CheckboxLabel>
  );
};

export default Checkbox;
