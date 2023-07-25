import { Typography } from '@mui/material';

type SectionTitle = React.PropsWithChildren;

export default function SectionTitle({ children }: SectionTitle) {
  return (
    <Typography
      variant="h6"
      component="h2"
      gutterBottom
      sx={{ fontWeight: 'bold' }}
    >
      {children}
    </Typography>
  );
}
