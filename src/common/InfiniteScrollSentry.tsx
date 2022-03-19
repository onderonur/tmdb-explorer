import useInfiniteScroll from 'react-infinite-scroll-hook';

export type InfiniteScrollSentryProps = Pick<
  Parameters<typeof useInfiniteScroll>[0],
  'hasNextPage' | 'loading' | 'onLoadMore'
>;

export default function InfiniteScrollSentry({
  hasNextPage,
  loading,
  onLoadMore,
}: InfiniteScrollSentryProps) {
  const [sentryRef] = useInfiniteScroll({
    hasNextPage,
    loading,
    onLoadMore,
    rootMargin: '0px 0px 400px 0px',
  });

  return <div ref={sentryRef} />;
}
