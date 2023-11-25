import { style } from '@vanilla-extract/css';

import { theme } from '@/libs/styles/theme.css';
import { queries } from '@/libs/styles/constants';

export const mainSection = style({
  padding: theme.spaces[12],
  margin: 'auto',
  maxWidth: '1200px',
  '@media': {
    [queries.desktop]: {
      padding: theme.spaces[40],
    },
  },
});
