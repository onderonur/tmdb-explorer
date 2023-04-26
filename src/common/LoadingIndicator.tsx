import { Box, CircularProgress } from '@mui/material';
import { forwardRef } from 'react';

type LoadingIndicatorProps = React.PropsWithChildren<{ loading: boolean }>;

const LoadingIndicator = forwardRef<HTMLDivElement, LoadingIndicatorProps>(
  function LoadingIndicator({ loading, children }, ref) {
    if (!loading) {
      return <>{children}</>;
    }

    return (
      <Box
        ref={ref}
        sx={{ display: 'flex', justifyContent: 'center', my: 2, flexGrow: 1 }}
      >
        <CircularProgress aria-label="Loading..." size={48} color="secondary" />
      </Box>
    );
  },
);

export default LoadingIndicator;
