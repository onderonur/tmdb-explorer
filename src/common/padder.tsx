import { Box } from '@mui/material';

type PadderProps = React.PropsWithChildren<{
  paddingX?: boolean;
  paddingY?: boolean;
}>;

export default function Padder({ paddingX, paddingY, children }: PadderProps) {
  return (
    <Box
      sx={{
        paddingX: paddingX ? { xs: 2, sm: 3 } : undefined,
        paddingY: paddingY ? { xs: 2, sm: 3 } : undefined,
      }}
    >
      {children}
    </Box>
  );
}
