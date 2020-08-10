import React from 'react';
import { Button, Box, Typography } from '@material-ui/core';
import NextLink from '@/components/NextLink';
import { NextPage } from 'next';

interface ErrorPageProps {
  statusCode?: number;
  message?: string;
}

// pages/_error.js is only used in production.
// In development you’ll get an error with the call
// stack to know where the error originated from.
// https://nextjs.org/docs/advanced-features/custom-error-page#customizing-the-error-page
const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode, message }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      flex={1}
      height="100vh"
      justifyContent="center"
      padding={2}
    >
      {statusCode && <Typography variant="h1">{statusCode}</Typography>}
      <Typography variant="h4" align="center">
        {message || 'Something went wrong'}
      </Typography>
      <Box marginTop={2}>
        <Button
          href="/"
          color="primary"
          variant="contained"
          component={NextLink}
        >
          Go to Homepage
        </Button>
      </Box>
    </Box>
  );
};

const notFoundStatusCode = 404;

ErrorPage.getInitialProps = async ({ res, err }) => {
  // TODO
  // When an error occurs in a "getServerSideProps" etc, both the "res" and "err" has a value.
  // If there is a client-side error, only "err" has a value.
  // If we open a non-existing path, "res" has a value but "err" not etc.
  // const statusCode = err?.statusCode ?? res?.statusCode ?? notFoundStatusCode;
  // const message =
  //   err?.message ??
  //   res?.statusMessage ??
  //   (statusCode === notFoundStatusCode ? 'Not Found' : undefined);
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  const message =
    res?.statusMessage ??
    err?.message ??
    (statusCode === notFoundStatusCode ? 'Not Found' : undefined);
  return { statusCode, message };
};

export default ErrorPage;
