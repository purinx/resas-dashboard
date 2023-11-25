import type { Meta, StoryObj } from '@storybook/react';

import data from '@/libs/resas/fixtures/prefectures';

import { PrefectureSelector } from '.';

const meta: Meta<typeof PrefectureSelector> = {
  component: PrefectureSelector,
};

export default meta;

export const PrefectureSelectorStory: StoryObj = {
  args: {
    prefectureOptions: data.result,
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
