import type { Meta, StoryObj } from '@storybook/react';

import { PopulationLabelSelector } from '.';

const meta: Meta<typeof PopulationLabelSelector> = {
  component: PopulationLabelSelector,
};

export default meta;

export const Story: StoryObj = {
  args: {},
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
