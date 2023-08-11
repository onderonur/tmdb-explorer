import BaseGridList, { BaseGridListProps } from './base-grid-list';
import InfiniteScrollSentry, {
  InfiniteScrollSentryProps,
} from './infinite-scroll-sentry';

type InfiniteGridListProps = Pick<
  BaseGridListProps,
  'listEmptyMessage' | 'children'
> &
  InfiniteScrollSentryProps;

export default function InfiniteGridList({
  listEmptyMessage,
  hasNextPage,
  loading,
  children,
  onLoadMore,
}: InfiniteGridListProps) {
  return (
    <>
      <BaseGridList listEmptyMessage={listEmptyMessage}>
        {children}
      </BaseGridList>
      <InfiniteScrollSentry
        loading={loading}
        hasNextPage={hasNextPage}
        onLoadMore={onLoadMore}
      />
    </>
  );
}
