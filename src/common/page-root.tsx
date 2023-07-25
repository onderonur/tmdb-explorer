import { Container, Divider, SxProps, Theme, Toolbar } from '@mui/material';

type PageRootProps = React.PropsWithChildren<{
  hasHeaderGutter?: boolean;
  hero?: React.ReactNode;
  sx?: SxProps<Theme>;
}>;

export default function PageRoot({
  hasHeaderGutter,
  hero,
  sx,
  children,
}: PageRootProps) {
  return (
    <>
      {hasHeaderGutter && <Toolbar />}
      {hero}
      <Container
        maxWidth={false}
        sx={[
          { paddingY: 2 },
          // https://mui.com/system/getting-started/the-sx-prop/#passing-the-sx-prop
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        {hero && <Divider sx={{ marginBottom: 2 }} />}
        {children}
      </Container>
    </>
  );
}
