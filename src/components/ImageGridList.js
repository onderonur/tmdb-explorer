import React from 'react';
import BaseGridList from './BaseGridList';
import ImageGridListItem from './ImageGridListItem';

function ImageGridList({
  filePaths,
  isFetching,
  imageAspectRatio,
  minItemWidth = 120,
}) {
  function renderItem(filePath) {
    return (
      <ImageGridListItem filePath={filePath} aspectRatio={imageAspectRatio} />
    );
  }

  return (
    <BaseGridList
      keyExtractor={(item) => item}
      items={filePaths}
      loading={isFetching}
      minItemWidth={minItemWidth}
      renderItem={renderItem}
      listEmptyMessage="No image has been found."
    />
  );
}

export default ImageGridList;
