import { recipe } from '@vanilla-extract/recipes';

import { theme } from './theme.css';

export const heading = recipe({
  base: {
    fontSize: theme.fontSizes.h1,
    fontWeight: 'bold',
    marginBottom: theme.spaces[40],
  },
  variants: {
    as: {
      h1: {
        fontSize: theme.fontSizes.h1,
        marginBottom: theme.spaces[40],
      },
      h2: {
        fontSize: theme.fontSizes.h2,
        marginBottom: theme.spaces[32],
      },
      h3: {
        fontSize: theme.fontSizes.h3,
        marginBottom: theme.spaces[24],
      },
    },
  },
});
