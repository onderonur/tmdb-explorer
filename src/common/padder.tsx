import { Box } from '@mui/material';

type PadderProps = React.PropsWithChildren<{
  disableMobilePadding?: boolean;
}>;

export function Padder({ disableMobilePadding, children }: PadderProps) {
  return (
    <Box sx={{ paddingX: { xs: disableMobilePadding ? 0 : 2, md: 3 } }}>
      {children}
    </Box>
  );
}
