import { Box, CircularProgress } from '@mui/material';
import React from 'react';

type LoadingIndicatorProps = React.PropsWithChildren<{ loading: boolean }>;

const LoadingIndicator = React.forwardRef<
  HTMLDivElement,
  LoadingIndicatorProps
>(function LoadingIndicator({ loading, children }, ref) {
  if (!loading) {
    return <>{children}</>;
  }

  return (
    <Box ref={ref} display="flex" justifyContent="center" my={2} flexGrow={1}>
      <CircularProgress size={48} color="secondary" />
    </Box>
  );
});

export default LoadingIndicator;
