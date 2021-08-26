import React from 'react';
import BaseGridList from './BaseGridList';
import { idExtractor } from '@/common/CommonUtils';
import { ItemWithId } from '@/common/CommonTypes';
import useInfiniteScroll from 'react-infinite-scroll-hook';

interface InfiniteGridListProps<Item extends ItemWithId> {
  items: Item[];
  loading?: boolean;
  hasNextPage: boolean;
  onLoadMore: VoidFunction;
  renderItem: (item: Item) => React.ReactNode;
  minItemWidth?: number;
  spacing?: number;
  keyExtractor?: (item: Item, index: number) => number;
}

function InfiniteGridList<Item extends ItemWithId>({
  items,
  loading,
  hasNextPage,
  onLoadMore,
  renderItem,
  minItemWidth,
  spacing,
  keyExtractor = idExtractor,
}: InfiniteGridListProps<Item>) {
  const [sentryRef] = useInfiniteScroll({
    hasNextPage,
    loading: !!loading,
    onLoadMore,
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <BaseGridList
      keyExtractor={keyExtractor}
      items={items}
      loading={loading || hasNextPage}
      minItemWidth={minItemWidth}
      spacing={spacing}
      renderItem={renderItem}
      loadingRef={sentryRef}
    />
  );
}

export default InfiniteGridList;
