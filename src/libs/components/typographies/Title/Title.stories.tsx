import { Meta, StoryObj } from "@storybook/react";

import { Title } from ".";

const meta: Meta<typeof Title> = {
  component: Title,
};

export default meta;

export const TitleStory: StoryObj = {
  args: {
    children: "This is styled with vanilla-extract.",
  },
};
