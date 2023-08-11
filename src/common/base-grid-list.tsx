import { Box, Typography } from '@mui/material';
import { Children } from 'react';

const spacing = 1;

export type BaseGridListProps = React.PropsWithChildren<{
  listEmptyMessage?: string;
}>;

export default function BaseGridList({
  listEmptyMessage = 'Nothing has been found',
  children,
}: BaseGridListProps) {
  if (!Children.count(children)) {
    return listEmptyMessage && <Typography>{listEmptyMessage}</Typography>;
  }

  return (
    <Box
      component="ul"
      sx={{
        listStyle: 'none',
        padding: 0,
        display: 'grid',
        columnGap: spacing,
        rowGap: spacing * 3,
        gridTemplateColumns: {
          xs: `repeat(auto-fill, minmax(9rem, 1fr))`,
          md: `repeat(auto-fill, minmax(12rem, 1fr))`,
        },
        margin: 0,
      }}
    >
      {children}
    </Box>
  );
}
