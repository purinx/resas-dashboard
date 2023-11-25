import { style } from '@vanilla-extract/css';

import { theme } from '@/libs/styles/theme.css';

export const label = style({
  width: 'max-content',
  fontSize: '15px',
  color: theme.color.black,
  display: 'flex',
  alignItems: 'center',
});

export const button = style({
  borderRadius: theme.radius.md,
  width: '25px',
  height: '25px',
  padding: 0,
  background: theme.color.white,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '1em',
});

export const icon = style({
  transition: 'width .1s linear',
  height: '20px',
  width: '20px',
  selectors: {
    '&[aria-hidden=true]': {
      width: 0,
    },
  },
});
