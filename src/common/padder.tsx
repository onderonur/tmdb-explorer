import { Container } from '@mui/material';

type PadderProps = React.PropsWithChildren<{
  paddingY?: boolean;
}>;

export default function Padder({ paddingY, children }: PadderProps) {
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
