import React from 'react';
import { RootRef } from '@material-ui/core';
import useInfiniteScroll from 'react-infinite-scroll-hook';

type InfiniteScrollWrapperProps = React.PropsWithChildren<{
  hasNextPage: boolean;
  loading: boolean;
  onLoadMore: VoidFunction;
}>;

function InfiniteScrollWrapper({
  hasNextPage,
  loading,
  onLoadMore,
  children,
}: InfiniteScrollWrapperProps) {
  const infiniteContainerRef = useInfiniteScroll({
    hasNextPage,
    loading,
    onLoadMore,
  });

  return <RootRef rootRef={infiniteContainerRef}>{children}</RootRef>;
}

export default InfiniteScrollWrapper;
