import React from 'react';
import { Button, Box, Typography } from '@material-ui/core';
import NextLink from '@/components/NextLink';

interface ErrorMessageProps {
  statusCode?: number;
  message?: string;
}

function ErrorMessage({ statusCode, message }: ErrorMessageProps) {
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
}

export default ErrorMessage;
