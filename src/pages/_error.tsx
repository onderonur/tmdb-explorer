import { NextPage } from 'next';
import ErrorMessage from '@/error-handling/ErrorMessage';

interface ErrorPageProps {
  statusCode?: number;
  message?: string;
}

// pages/_error.js is only used in production.
// In development you’ll get an error with the call
// stack to know where the error originated from.
// https://nextjs.org/docs/advanced-features/custom-error-page#customizing-the-error-page
const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode, message }) => {
  return <ErrorMessage statusCode={statusCode} message={message} />;
};

const notFoundStatusCode = 404;

ErrorPage.getInitialProps = async ({ res, err }) => {
  // When an error occurs in a "getServerSideProps" etc, both the "res" and "err" has a value.
  // If there is a client-side error, only "err" has a value.
  // If we open a non-existing path, "res" has a value but "err" not etc.
  const statusCode = err?.statusCode ?? res?.statusCode ?? notFoundStatusCode;
  const message =
    err?.message ??
    res?.statusMessage ??
    (statusCode === notFoundStatusCode ? 'Not Found' : undefined);
  return { statusCode, message };
};

export default ErrorPage;
