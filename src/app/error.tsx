'use client';

import { ErrorScreen } from '@/libs/components/layouts/ErrorScreen';
import { NextError, useLogError } from '@/libs/hooks/useLogError';

type Props = {
  error: NextError;
};

export const Error = ({ error }: Props) => {
  useLogError(error);
  return <ErrorScreen />;
};
