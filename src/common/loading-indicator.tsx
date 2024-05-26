import { Box, CircularProgress } from '@mui/material';
import { forwardRef } from 'react';

type LoadingIndicatorProps = React.PropsWithChildren<{ loading: boolean }>;

export const LoadingIndicator = forwardRef<
  React.ElementRef<'div'>,
  LoadingIndicatorProps
>(function LoadingIndicator({ loading, children }, ref) {
  if (!loading) {
    return <>{children}</>;
  }

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginY: 2,
        flexGrow: 1,
      }}
    >
      <CircularProgress aria-label="Loading..." size={48} color="secondary" />
    </Box>
  );
});
