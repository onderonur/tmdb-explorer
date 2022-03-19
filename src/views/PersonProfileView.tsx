import { useRouter } from 'next/router';
import BaseSeo from '@/seo/BaseSeo';
import { withGetServerSideError } from '@/error-handling/withGetServerSideError';
import { dehydrate, useQuery } from 'react-query';
import { createQueryClient } from '@/http-client/queryClient';
import useApiConfiguration from '@/api-configuration/useApiConfiguration';
import PersonProfile from '@/people-profile/PersonProfile';
import { commonQueries } from '@/api-configuration/apiConfigurationQueries';
import { peopleQueries } from '@/people/peopleQueries';

function PersonProfileView() {
  const router = useRouter();
  const personId = Number(router.query.personId);
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

export const getServerSideProps = withGetServerSideError(async (context) => {
  const personId = Number(context.params.personId);

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
