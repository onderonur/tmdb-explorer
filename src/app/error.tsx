'use client';

import { ErrorMessage } from '@/error-handling/error-message';
import { PageRoot } from '@/layout/page-root';

type ErrorPageProps = {
  error: Error;
};

export default function ErrorPage({ error }: ErrorPageProps) {
  return (
    <PageRoot hasHeaderGutter>
      <ErrorMessage statusCode={500} message={error.message} />
    </PageRoot>
  );
}
