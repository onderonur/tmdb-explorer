import React from 'react';
import LoadingIndicator from '@/common/LoadingIndicator';
import { Typography, Theme, makeStyles } from '@material-ui/core';
import { idExtractor } from '@/common/CommonUtils';
import { Maybe } from '@/common/CommonTypes';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DEFAULT_ITEMS: any[] = [];

interface BaseGridListStyleProps {
  spacing: number;
  minItemWidth: number;
}

const useStyles = makeStyles<Theme, BaseGridListStyleProps>((theme) => ({
  flexList: {
    listStyle: 'none',
    padding: 0,
    display: 'grid',
    gridGap: ({ spacing }) => theme.spacing(spacing),
    gridTemplateColumns: ({ minItemWidth }) =>
      `repeat(auto-fill, minmax(${minItemWidth}px, 1fr))`,
  },
}));

interface BaseGridListProps<Item> {
  items?: Maybe<Item[]>;
  loading: boolean;
  renderItem: (item: Item, index: number) => React.ReactNode;
  spacing?: number;
  minItemWidth?: number;
  keyExtractor?: string | ((item: Item, index: number) => string | number);
  listEmptyMessage?: string;
  loadingRef?: React.Ref<HTMLDivElement>;
}

function BaseGridList<Item>({
  items = DEFAULT_ITEMS,
  loading,
  renderItem,
  spacing = 1,
  minItemWidth = 160,
  keyExtractor = idExtractor,
  listEmptyMessage = 'Nothing has been found',
  loadingRef,
}: BaseGridListProps<Item>) {
  const classes = useStyles({ minItemWidth, spacing });

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
      <ul className={classes.flexList}>
        {items?.map((item, index) => {
          const key = extractItemKey(item, index);
          return (
            <React.Fragment key={key}>{renderItem(item, index)}</React.Fragment>
          );
        })}
      </ul>
      <LoadingIndicator ref={loadingRef} loading={loading} />
    </>
  );
}

export default BaseGridList;
