import { mergeSx } from '@/theme/theme-utils';
import { Box, Toolbar } from '@mui/material';

type PageRootProps = React.PropsWithChildren<{
  hasHeaderGutter?: boolean;
}>;

export default function PageRoot({ hasHeaderGutter, children }: PageRootProps) {
  return (
    <div>
      {hasHeaderGutter && <Toolbar />}
      <Box
        sx={mergeSx(
          { paddingY: 0 },
          hasHeaderGutter && { paddingTop: { md: 2 } },
        )}
      >
        {children}
      </Box>
    </div>
  );
}
