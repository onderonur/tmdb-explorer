import { Typography } from '@mui/material';

type SectionTitle = {
  title: string;
};

export default function SectionTitle({ title }: SectionTitle) {
  return (
    <Typography
      variant="h6"
      component="h2"
      gutterBottom
      sx={{ fontWeight: 'bold' }}
    >
      {title}
    </Typography>
  );
}
