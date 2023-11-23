import { createGlobalTheme } from '@vanilla-extract/css';

export const theme = createGlobalTheme(':root', {
  color: {
    white: '#fff',
    black: '#000',
  },
  radius: {
    md: '4px',
  },
  spaces: {
    4: '4px',
    8: '8px',
    12: '12px',
    16: '16px',
    24: '24px',
    32: '32px',
    40: '40px',
    60: '60px',
  },
  fontSizes: {
    h1: '30px',
    h2: '24px',
    h3: '20px',
  },
});
