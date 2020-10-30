import React from 'react';
import { List } from '@material-ui/core';
import LoadingIndicator from './LoadingIndicator';

interface BaseListProps<Item> {
  data: Item[];
  renderItem: (item: Item, index: number) => React.ReactNode;
  loading?: boolean;
  listEmptyMessage?: string;
}

function BaseList<Item>({
  data,
  renderItem,
  loading,
  listEmptyMessage = 'Nothing has been found',
}: BaseListProps<Item>) {
  if (loading) {
    return <LoadingIndicator loading />;
  } else if (!data.length) {
    return <>{listEmptyMessage}</>;
  }

  return <List>{data.map((item, index) => renderItem(item, index))}</List>;
}

export default BaseList;
