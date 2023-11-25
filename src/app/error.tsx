'use client';

import { ErrorScreen } from '@/libs/components/layouts/ErrorScreen';
import { NextError, useLogError } from '@/libs/hooks/useLogError';

type Props = {
  error: NextError;
};

const ErrorPage = ({ error }: Props) => {
  useLogError(error);
  return <ErrorScreen />;
};

export default ErrorPage;
