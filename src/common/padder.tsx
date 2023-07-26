import { Box, Container } from '@mui/material';

type PadderProps = React.PropsWithChildren<{
  paddingY?: boolean;
}>;

export default function Padder({ paddingY, children }: PadderProps) {
  if (true) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          paddingY: paddingY ? { xs: 2, sm: 3 } : undefined,
        }}
      >
        {children}
      </Container>
    );
  }

  return (
    <Box
      sx={{
        paddingX: { xs: 2, sm: 3 },
        paddingY: paddingY ? { xs: 2, sm: 3 } : undefined,
        maxWidth: 1754,
        width: '100%',
        marginX: 'auto',
      }}
    >
      {children}
    </Box>
  );
}
