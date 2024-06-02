import type { BaseGridListProps } from './base-grid-list';
import { BaseGridList } from './base-grid-list';
import type { InfiniteScrollSentryProps } from './infinite-scroll-sentry';
import { InfiniteScrollSentry } from './infinite-scroll-sentry';

export function getInfiniteSwrKey({
  pageIndex,
  pageKeyTemplate,
}: {
  pageIndex: number;
  pageKeyTemplate: string;
}) {
  return decodeURIComponent(pageKeyTemplate).replace(
    '%pageIndex%',
    (pageIndex + 1).toString(),
  );
}

type InfiniteGridListProps = Pick<
  BaseGridListProps,
  'listEmptyMessage' | 'children'
> &
  InfiniteScrollSentryProps;

export function InfiniteGridList({
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
