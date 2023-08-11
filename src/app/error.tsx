'use client';

import ErrorMessage from '@/error-handling/ErrorMessage';
import { Toolbar } from '@mui/material';

type ErrorPageProps = {
  error: Error;
};

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <>
      <Toolbar />
      <ErrorMessage statusCode={500} message={error.message} />
    </>
  );
}
