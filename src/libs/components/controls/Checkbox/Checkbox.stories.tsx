import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './index';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
};

export default meta;

export const CheckboxWithState = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox onChange={setChecked} checked={checked}>
      Toggle Me!
    </Checkbox>
  );
};

CheckboxWithState.args = {};
