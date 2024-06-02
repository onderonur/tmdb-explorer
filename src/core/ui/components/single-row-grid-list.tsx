import { Box, Typography } from '@mui/material';
import { Children } from 'react';

type SingleRowGridListProps = {
  itemCount: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  children: React.ReactNode;
};

export function SingleRowGridList({
  itemCount,
  children,
}: SingleRowGridListProps) {
  if (!Children.count(children)) {
    return <Typography>Nothing has been found</Typography>;
  }

  return (
    <Box
      component="ul"
      sx={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'grid',
        gridTemplateColumns: {
          xs: itemCount.xs ? `repeat(${itemCount.xs}, 1fr)` : null,
          sm: itemCount.sm ? `repeat(${itemCount.sm}, 1fr)` : null,
          md: itemCount.md ? `repeat(${itemCount.md}, 1fr)` : null,
          lg: itemCount.lg ? `repeat(${itemCount.lg}, 1fr)` : null,
          xl: itemCount.xl ? `repeat(${itemCount.xl}, 1fr)` : null,
        },
        gridAutoRows: 0,
        gridTemplateRows: '1fr',
        overflowY: 'hidden',
        // If we use gap instead of columnGap, this row hiding solution gets buggy.
        columnGap: 1,
      }}
    >
      {children}
    </Box>
  );
}
