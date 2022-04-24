import { useRouter } from 'next/router';
import BaseSeo from '@/seo/BaseSeo';
import { withGetServerSideError } from '@/error-handling/withGetServerSideError';
import { dehydrate, useQuery } from 'react-query';
import { createQueryClient } from '@/http-client/queryClient';
import useApiConfiguration from '@/api-configuration/useApiConfiguration';
import PersonProfile from '@/people-profile/PersonProfile';
import { commonQueries } from '@/api-configuration/apiConfigurationQueries';
import { peopleQueries } from '@/people/peopleQueries';
import { ParsedUrlQuery } from 'querystring';

function getPersonId(query: ParsedUrlQuery) {
  return Number(query.personId);
}

function PersonProfileView() {
  const router = useRouter();
  const personId = getPersonId(router.query);
  const { data: person, isLoading } = useQuery(
    peopleQueries.personDetails(personId),
  );

  const { getImageUrl } = useApiConfiguration();

  return (
    <>
      {person && (
        <BaseSeo
          title={person.name}
          description={person.biography || undefined}
          openGraph={{
            images: [{ url: getImageUrl(person.profile_path) }],
          }}
        />
      )}
      <PersonProfile person={person} loading={isLoading} />
    </>
  );
}

export const getServerSideProps = withGetServerSideError(async (ctx) => {
  const personId = getPersonId(ctx.params);

  const queryClient = createQueryClient();
  await Promise.all([
    queryClient.fetchQuery(commonQueries.configuration()),
    queryClient.fetchQuery(peopleQueries.personDetails(personId)),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});

export default PersonProfileView;
