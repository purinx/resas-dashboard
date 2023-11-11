import { createGlobalTheme } from '@vanilla-extract/css';

export const theme = createGlobalTheme(':root', {
  color: {
    white: '#fff',
    black: '#000',
  },
  radius: {
    md: '4px',
  },
});
