import React from 'react';
import { RootRef } from '@material-ui/core';
import useInfiniteScroll from 'react-infinite-scroll-hook';

function InfiniteScrollWrapper({ hasNextPage, loading, onLoadMore, children }) {
  const infiniteContainerRef = useInfiniteScroll({
    hasNextPage,
    loading,
    onLoadMore,
  });

  return <RootRef rootRef={infiniteContainerRef}>{children}</RootRef>;
}

export default InfiniteScrollWrapper;
