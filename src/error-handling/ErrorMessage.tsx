import { Button, Box, Typography } from '@mui/material';
import NextLink from '@/routing/NextLink';

interface ErrorMessageProps {
  statusCode?: number;
  message?: string;
}

function ErrorMessage({ statusCode, message }: ErrorMessageProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        placeContent: 'center',
        justifyItems: 'center',
        textAlign: 'center',
        minHeight: '100%',
        padding: 2,
      }}
    >
      {statusCode && <Typography variant="h1">{statusCode}</Typography>}
      <Typography variant="h4">{message || 'Something went wrong'}</Typography>
      <Button
        aria-label="Go to Homepage"
        href="/"
        variant="contained"
        component={NextLink}
        sx={{ marginTop: 2, marginBottom: 8 }}
      >
        Go to Homepage
      </Button>
    </Box>
  );
}

export default ErrorMessage;
