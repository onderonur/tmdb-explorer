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
        gap: 2,
        placeContent: 'center',
        justifyItems: 'center',
        textAlign: 'center',
        minHeight: '80vh',
        padding: 2,
      }}
    >
      {statusCode && (
        <Typography variant="h1" sx={{ fontWeight: 'bold' }}>
          {statusCode}
        </Typography>
      )}
      <Typography
        variant="h4"
        component="p"
        sx={{ color: 'text.secondary', fontWeight: 'medium' }}
      >
        {message || 'Something went wrong'}
      </Typography>
      <ButtonLink href="/" variant="contained">
        Go to Homepage
      </ButtonLink>
    </Box>
  );
}
