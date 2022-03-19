import PersonCard from '@/people/PersonCard';
import BaseSeo from '@/seo/BaseSeo';
import { PaginationResponse } from '@/common/CommonTypes';
import { withGetServerSideError } from '@/error-handling/withGetServerSideError';
import { dehydrate, useInfiniteQuery } from 'react-query';
import { getAllPageResults } from '@/common/CommonUtils';
import { createQueryClient } from '@/http-client/queryClient';
import PageTitle from '@/common/PageTitle';
import { Person } from '@/people/PeopleTypes';
import { commonQueries } from '@/api-configuration/apiConfigurationQueries';
import { peopleQueries } from '@/people/peopleQueries';
import InfiniteGridList from '@/common/InfiniteGridList';

function PopularPeopleView() {
  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery<
    PaginationResponse<Person>
  >(peopleQueries.popularPeople());

  return (
    <>
      <BaseSeo title="Popular People" description="Popular people list" />
      <PageTitle title="Popular People" />
      <InfiniteGridList
        loading={isFetching}
        hasNextPage={!!hasNextPage}
        onLoadMore={fetchNextPage}
      >
        {getAllPageResults(data).map((person) => {
          return (
            <li key={person.id}>
              <PersonCard person={person} />
            </li>
          );
        })}
      </InfiniteGridList>
    </>
  );
}

export const getServerSideProps = withGetServerSideError(async () => {
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.fetchQuery(commonQueries.configuration()),
    queryClient.fetchInfiniteQuery(peopleQueries.popularPeople()),
  ]);

  return {
    props: {
      // There is an issue when we use infinite query while SSR.
      // So, we use this workaround.
      // https://github.com/tannerlinsley/react-query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
});

export default PopularPeopleView;
