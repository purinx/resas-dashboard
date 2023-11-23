import { queries } from '@/libs/styles/constants';
import { style } from '@vanilla-extract/css';

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

export const prefectureSelectSection = style({
  width: '100%',
});
