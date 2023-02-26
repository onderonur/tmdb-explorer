import { useRouter } from 'next/router';
import BaseSeo from '@/seo/BaseSeo';
import { dehydrate, useQuery } from '@tanstack/react-query';
import { createQueryClient } from '@/http-client/queryClient';
import useApiConfiguration from '@/api-configuration/ApiConfigurationHooks';
import PersonProfile from '@/people-profile/PersonProfile';
import { apiConfigurationAPI } from '@/api-configuration/apiConfigurationAPI';
import { peopleAPI } from '@/people/peopleAPI';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSideProps } from 'next';

function getPersonId(query: ParsedUrlQuery) {
  return Number(query.personId);
}

function PersonProfilePage() {
  const router = useRouter();
  const personId = getPersonId(router.query);
  const { data: person, isLoading } = useQuery(
    peopleAPI.personDetails(personId),
  );

  const { getImageUrl } = useApiConfiguration();

  return (
    <>
      {person && (
        <BaseSeo
          title={person.name}
          description={person.biography || undefined}
          openGraph={{
            images: [
              {
                url: getImageUrl(person.profile_path),
                width: 500,
                height: 750,
              },
            ],
          }}
        />
      )}
      <PersonProfile person={person} loading={isLoading} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const personId = getPersonId(ctx.params ?? {});
  const queryClient = createQueryClient();

  await Promise.all([
    queryClient.fetchQuery(apiConfigurationAPI.configuration()),
    queryClient.fetchQuery(peopleAPI.personDetails(personId)),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default PersonProfilePage;
