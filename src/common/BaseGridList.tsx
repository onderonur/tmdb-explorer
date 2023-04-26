import { Typography, styled } from '@mui/material';
import isPropValid from '@emotion/is-prop-valid';
import LoadingIndicator from './LoadingIndicator';
import { Children } from 'react';

interface BaseGridListStyleProps {
  spacing?: number;
  minItemWidth?: number;
}

const List = styled('ul', {
  shouldForwardProp: (prop) => isPropValid(prop as string),
})<BaseGridListStyleProps>(({ theme, spacing = 1, minItemWidth }) => ({
  listStyle: 'none',
  padding: 0,
  display: 'grid',
  columnGap: theme.spacing(spacing),
  rowGap: theme.spacing(spacing * 3),
  gridTemplateColumns: `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`,
  margin: 0,
}));

export type BaseGridListProps = BaseGridListStyleProps &
  React.PropsWithChildren<{
    loading?: boolean;
    listEmptyMessage?: string;
  }>;

function BaseGridList({
  loading,
  spacing,
  minItemWidth = 160,
  listEmptyMessage = 'Nothing has been found',
  children,
}: BaseGridListProps) {
  if (!Children.count(children) && !loading) {
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
      <List spacing={spacing} minItemWidth={minItemWidth}>
        {children}
      </List>
      <LoadingIndicator loading={!!loading} />
    </>
  );
}

export default BaseGridList;
