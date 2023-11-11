import { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './index';
import { useState } from 'react';

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
