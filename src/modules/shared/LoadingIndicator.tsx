import React from 'react';
import { CircularProgress, Box, RootRef } from '@material-ui/core';

type LoadingIndicatorProps = React.PropsWithChildren<{ loading: boolean }>;

const LoadingIndicator = React.forwardRef<
  HTMLDivElement,
  LoadingIndicatorProps
>(function LoadingIndicator({ loading, children }, ref) {
  if (!loading) {
    return <>{children}</>;
  }

  const content = (
    <Box display="flex" justifyContent="center" my={2} flexGrow={1}>
      <CircularProgress size={48} color="secondary" />
    </Box>
  );

  if (!ref) {
    return content;
  }

  return <RootRef rootRef={ref}>{content}</RootRef>;
});

export default LoadingIndicator;
