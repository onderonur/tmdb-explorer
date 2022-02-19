import React from 'react';
import LoadingIndicator from '@/common/LoadingIndicator';
import { Typography, styled } from '@mui/material';
import { Maybe } from '@/common/CommonTypes';
import isPropValid from '@emotion/is-prop-valid';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEFAULT_ITEMS: any[] = [];

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

type BaseGridListProps<Item> = BaseGridListStyleProps & {
  items: Maybe<Item[]>;
  loading: boolean;
  renderItem: (item: Item, index: number) => React.ReactNode;
  keyExtractor: string | ((item: Item, index: number) => string | number);
  listEmptyMessage?: string;
  loadingRef?: React.Ref<HTMLDivElement>;
};

function BaseGridList<Item>({
  items = DEFAULT_ITEMS,
  loading,
  renderItem,
  spacing,
  hasRowGutter,
  minItemWidth = 160,
  keyExtractor,
  listEmptyMessage = 'Nothing has been found',
  loadingRef,
}: BaseGridListProps<Item>) {
  function extractItemKey(item: Item, index: number) {
    return typeof keyExtractor === 'string'
      ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item as any)[keyExtractor]
      : keyExtractor(item, index);
  }

  if (!items?.length && !loading) {
    if (typeof listEmptyMessage === 'string') {
      return <Typography>{listEmptyMessage}</Typography>;
    }

    return listEmptyMessage;
  }

  return (
    <>
      <List
        spacing={spacing}
        hasRowGutter={hasRowGutter}
        minItemWidth={minItemWidth}
      >
        {items?.map((item, index) => {
          const key = extractItemKey(item, index);
          return (
            <React.Fragment key={key}>{renderItem(item, index)}</React.Fragment>
          );
        })}
      </List>
      <LoadingIndicator ref={loadingRef} loading={loading} />
    </>
  );
}

export default BaseGridList;
