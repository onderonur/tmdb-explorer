import { Box, Typography } from '@mui/material';
import { Children } from 'react';

type BaseGridListStyleProps = {
  spacing?: number;
  minItemWidth?: number;
};

export type BaseGridListProps = BaseGridListStyleProps &
  React.PropsWithChildren<{
    listEmptyMessage?: string;
  }>;

function BaseGridList({
  spacing = 1,
  minItemWidth = 10,
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
        gridTemplateColumns: `repeat(auto-fill, minmax(${minItemWidth}rem, 1fr))`,
        margin: 0,
      }}
    >
      {children}
    </Box>
  );
}

export default BaseGridList;
