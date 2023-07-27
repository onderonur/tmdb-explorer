import { SxProps, Theme, Typography } from '@mui/material';

type SectionTitle = {
  title: string;
  sx?: SxProps<Theme>;
};

export default function SectionTitle({ title, sx }: SectionTitle) {
  return (
    <Typography
      variant="h6"
      component="h2"
      gutterBottom
      sx={[{ fontWeight: 'bold' }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {title}
    </Typography>
  );
}
