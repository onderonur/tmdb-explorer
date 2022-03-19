import { Typography, styled } from '@mui/material';
import isPropValid from '@emotion/is-prop-valid';
import React from 'react';
import LoadingIndicator from './LoadingIndicator';

interface BaseGridListStyleProps {
  spacing?: number;
  hasRowGutter?: boolean;
  minItemWidth?: number;
}

const List = styled('ul', {
  shouldForwardProp: (prop) => isPropValid(prop),
})<BaseGridListStyleProps>(
  ({ theme, spacing = 1, hasRowGutter, minItemWidth }) => ({
    listStyle: 'none',
    padding: 0,
    display: 'grid',
    columnGap: theme.spacing(spacing),
    rowGap: theme.spacing(hasRowGutter ? spacing * 3 : spacing),
    gridTemplateColumns: `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`,
    margin: 0,
  }),
);

export type BaseGridListProps = BaseGridListStyleProps &
  React.PropsWithChildren<{
    loading?: boolean;
    listEmptyMessage?: string;
  }>;

function BaseGridList({
  loading,
  spacing,
  hasRowGutter,
  minItemWidth = 160,
  listEmptyMessage = 'Nothing has been found',
  children,
}: BaseGridListProps) {
  if (!React.Children.count(children) && !loading) {
    if (!listEmptyMessage) {
      return null;
    }

    return typeof listEmptyMessage === 'string' ? (
      <Typography>{listEmptyMessage}</Typography>
    ) : (
      listEmptyMessage
    );
  }

  return (
    <>
      <List
        spacing={spacing}
        hasRowGutter={hasRowGutter}
        minItemWidth={minItemWidth}
      >
        {children}
      </List>
      <LoadingIndicator loading={!!loading} />
    </>
  );
}

export default BaseGridList;
