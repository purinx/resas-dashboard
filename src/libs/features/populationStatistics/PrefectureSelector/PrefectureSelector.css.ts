import { style } from '@vanilla-extract/css';

import { queries } from '@/libs/styles/constants';

export const checkBoxGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, 100px)',
  gap: '20px',
  maxWidth: '100%',
  marginBottom: '50px',
  justifyContent: 'center',
  '@media': {
    [queries.desktop]: {
      justifyContent: 'flex-start',
    },
  },
});
