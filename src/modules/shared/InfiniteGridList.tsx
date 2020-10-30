import React from 'react';
import InfiniteScrollWrapper from '@/modules/shared/InfiniteScrollWrapper';
import BaseGridList from './BaseGridList';
import { idExtractor } from '@/modules/shared/SharedUtils';
import { ItemWithId } from '@/modules/shared/SharedTypes';

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
  return (
    <InfiniteScrollWrapper
      hasNextPage={hasNextPage}
      loading={!!loading}
      onLoadMore={onLoadMore}
    >
      <BaseGridList
        keyExtractor={keyExtractor}
        items={items}
        loading={loading || hasNextPage}
        minItemWidth={minItemWidth}
        spacing={spacing}
        renderItem={renderItem}
      />
    </InfiniteScrollWrapper>
  );
}

export default InfiniteGridList;
