import BaseGridList, { BaseGridListProps } from './BaseGridList';
import InfiniteScrollSentry, {
  InfiniteScrollSentryProps,
} from './InfiniteScrollSentry';

type InfiniteGridListProps = Pick<
  BaseGridListProps,
  'listEmptyMessage' | 'children'
> &
  InfiniteScrollSentryProps;

function InfiniteGridList({
  listEmptyMessage,
  hasNextPage,
  loading,
  children,
  onLoadMore,
}: InfiniteGridListProps) {
  return (
    <>
      <BaseGridList
        // If list has next page, we keep loading shown
        // to prevent flickering of loading indicator.
        loading={loading || hasNextPage}
        listEmptyMessage={listEmptyMessage}
      >
        {children}
      </BaseGridList>
      <InfiniteScrollSentry
        loading={loading}
        hasNextPage={!!hasNextPage}
        onLoadMore={onLoadMore}
      />
    </>
  );
}

export default InfiniteGridList;
