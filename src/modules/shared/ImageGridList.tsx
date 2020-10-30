import React from 'react';
import BaseGridList from '@/modules/shared/BaseGridList';
import ImageGridListItem from './ImageGridListItem';
import { Maybe } from '@/modules/shared/SharedTypes';

interface ImageGridListProps {
  filePaths: Maybe<string[]>;
  isFetching: boolean;
  aspectRatio: string;
  minItemWidth?: number;
}

function keyExtractor(item: string) {
  return item;
}

function ImageGridList({
  filePaths,
  isFetching,
  aspectRatio,
  minItemWidth = 120,
}: ImageGridListProps) {
  function renderItem(filePath: string) {
    return <ImageGridListItem filePath={filePath} aspectRatio={aspectRatio} />;
  }

  return (
    <BaseGridList
      keyExtractor={keyExtractor}
      items={filePaths}
      loading={isFetching}
      minItemWidth={minItemWidth}
      renderItem={renderItem}
      listEmptyMessage="No image has been found."
    />
  );
}

export default ImageGridList;
