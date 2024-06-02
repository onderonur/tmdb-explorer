import { mergeSx } from '@/core/theme/theme.utils';
import type { SxProps, Theme } from '@mui/material';
import { Typography } from '@mui/material';

type SectionTitle = {
  title: string;
  sx?: SxProps<Theme>;
};

export function SectionTitle({ title, sx }: SectionTitle) {
  return (
    <Typography
      variant="h6"
      component="h2"
      gutterBottom
      sx={mergeSx({ fontWeight: 'bold' }, sx)}
    >
      {title}
    </Typography>
  );
}
