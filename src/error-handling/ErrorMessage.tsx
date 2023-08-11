import { Box, Typography } from '@mui/material';
import ButtonLink from '@/common/button-link';

type ErrorMessageProps = {
  statusCode?: number;
  message?: string;
};

export default function ErrorMessage({
  statusCode,
  message,
}: ErrorMessageProps) {
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
      <ButtonLink
        aria-label="Go to Homepage"
        href="/"
        variant="contained"
        sx={{ marginTop: 2, marginBottom: 8 }}
      >
        Go to Homepage
      </ButtonLink>
    </Box>
  );
}
