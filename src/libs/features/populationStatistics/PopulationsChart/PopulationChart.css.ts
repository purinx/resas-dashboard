import { queries } from '@/libs/styles/constants';
import { theme } from '@/libs/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const chartWrapper = style({
  margin: 'auto',
  '@media': {
    [queries.desktop]: {
      marginTop: theme.spaces[40],
    },
  },
});
