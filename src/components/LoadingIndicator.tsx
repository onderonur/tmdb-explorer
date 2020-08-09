import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';

type LoadingIndicatorProps = React.PropsWithChildren<{ loading: boolean }>;

function LoadingIndicator({ loading, children }: LoadingIndicatorProps) {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={2} flexGrow={1}>
        <CircularProgress size={48} color="secondary" />
      </Box>
    );
  }

  return <>{children}</>;
}

export default LoadingIndicator;
