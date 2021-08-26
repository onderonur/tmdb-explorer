import React from 'react';
import BaseGridList from '@/common/BaseGridList';
import ImageGridListItem from './ImageGridListItem';
import { Maybe } from '@/common/CommonTypes';

interface ImageGridListProps {
  filePaths: Maybe<string[]>;
  isFetching: boolean;
  minItemWidth?: number;
  imgSize: {
    width: number;
    height: number;
  };
}

function keyExtractor(item: string) {
  return item;
}

function ImageGridList({
  filePaths,
  isFetching,
  minItemWidth = 120,
  imgSize,
}: ImageGridListProps) {
  function renderItem(filePath: string) {
    return (
      <ImageGridListItem
        filePath={filePath}
        width={imgSize.width}
        height={imgSize.height}
      />
    );
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
