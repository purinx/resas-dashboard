import { style } from '@vanilla-extract/css';

import { queries } from '@/libs/styles/constants';

export const revertSp = style({
  display: 'flex',
  flexDirection: 'column-reverse',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  '@media': {
    [queries.desktop]: {
      flexDirection: 'column',
    },
  },
});

export const subSection = style({
  width: '100%',
});
