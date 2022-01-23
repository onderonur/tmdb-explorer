import React from 'react';
import { useRouter } from 'next/router';
import BaseSeo from '@/seo/BaseSeo';
import { withGetServerSideError } from '@/error-handling/withGetServerSideError';
import PersonProfile from '@/people-profile/PersonProfile';
import { dehydrate, useQuery } from 'react-query';
import { apiQueries } from '@/http-client/apiQueries';
import { createQueryClient } from '@/http-client/queryClient';
import useApiConfiguration from '@/api-configuration/useApiConfiguration';

function PersonProfileView() {
  const router = useRouter();
  const personId = Number(router.query.personId);
  const { data, isLoading } = useQuery(apiQueries.people.person(personId));

  const { getImageUrl } = useApiConfiguration();

  return (
    <>
      {data && (
        <BaseSeo
          title={data.name}
          description={data.biography || undefined}
          openGraph={{ images: [{ url: getImageUrl(data.profile_path) }] }}
        />
      )}
      <PersonProfile person={data} loading={isLoading} />
    </>
  );
}

export const getServerSideProps = withGetServerSideError(async (context) => {
  const personId = Number(context.params.personId);

  const queryClient = createQueryClient();
  await Promise.all([
    queryClient.fetchQuery(apiQueries.common.configuration()),
    queryClient.fetchQuery(apiQueries.people.person(personId)),
    queryClient.fetchQuery(apiQueries.people.personImages(personId)),
    queryClient.fetchQuery(apiQueries.people.personCredits(personId)),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});

export default PersonProfileView;
