import { Button, Box, Typography, Toolbar } from '@mui/material';
import NextLink from '@/routing/NextLink';

interface ErrorMessageProps {
  statusCode?: number;
  message?: string;
}

function ErrorMessage({ statusCode, message }: ErrorMessageProps) {
  return (
    <Box
      position="fixed"
      top={0}
      bottom={0}
      left={0}
      right={0}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      flex={1}
      padding={2}
    >
      {/* Top offset */}
      <Toolbar />
      {statusCode && <Typography variant="h1">{statusCode}</Typography>}
      <Typography variant="h4" align="center">
        {message || 'Something went wrong'}
      </Typography>
      <Box marginTop={2}>
        <Button
          aria-label="Go to Homepage"
          href="/"
          variant="contained"
          component={NextLink}
        >
          Go to Homepage
        </Button>
      </Box>
      {/* Bottom offset */}
      <Toolbar />
    </Box>
  );
}

export default ErrorMessage;
