import { Container } from '@mui/material';

type PagePaddingProps = React.PropsWithChildren;

// TODO: Change name
export default function PagePadding({ children }: PagePaddingProps) {
  return <Container maxWidth={false}>{children}</Container>;
}
