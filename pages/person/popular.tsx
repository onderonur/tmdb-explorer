import PersonCard from '@/people/PersonCard';
import BaseSeo from '@/seo/BaseSeo';
import { PaginationResponse } from '@/common/CommonTypes';
import { dehydrate, useInfiniteQuery } from '@tanstack/react-query';
import { getAllPageResults } from '@/common/CommonUtils';
import { createQueryClient } from '@/http-client/queryClient';
import PageTitle from '@/common/PageTitle';
import { Person } from '@/people/PeopleTypes';
import { apiConfigurationAPI } from '@/api-configuration/apiConfigurationAPI';
import { peopleAPI } from '@/people/peopleAPI';
import InfiniteGridList from '@/common/InfiniteGridList';
import { GetServerSideProps } from 'next';

function PopularPeoplePage() {
  const { data, hasNextPage, isFetching, fetchNextPage } = useInfiniteQuery<
    PaginationResponse<Person>
  >(peopleAPI.popularPeople());

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

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.fetchQuery(apiConfigurationAPI.configuration()),
    queryClient.fetchInfiniteQuery(peopleAPI.popularPeople()),
  ]);

  return {
    props: {
      // There is an issue when we use infinite query while SSR.
      // So, we use this workaround.
      // https://github.com/tannerlinsley/@tanstack/react-query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default PopularPeoplePage;
