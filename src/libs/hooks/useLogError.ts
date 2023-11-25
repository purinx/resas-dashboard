import { useEffect } from 'react';

import { logger } from '../logger';

export interface NextError extends Error {
  digest?: string;
}

export const useLogError = (error: NextError) => {
  useEffect(() => {
    if (error.digest) {
      logger.error(`Server Error digest: ${error.digest}`);
    } else {
      logger.error(error.message);
    }
  }, [error]);
};
