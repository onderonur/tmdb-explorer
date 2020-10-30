import React from 'react';
import useFetch from '@/modules/shared/useFetch';
import { useRouter } from 'next/router';
import { api, createUrl } from '@/modules/shared/SharedUtils';
import BaseSeo from '@/modules/seo/BaseSeo';
import { useApiConfiguration } from '@/modules/api-configuration/ApiConfigurationContext';
import { Person } from '@/modules/shared/SharedTypes';
import { GetServerSideProps } from 'next';
import withError, {
  withGetServerSideError,
  ServerSideProps,
} from '@/modules/errors/withError';
import PersonProfile from '@/modules/people-profile/PersonProfile';

type PersonProfileViewProps = ServerSideProps<Person>;

function PersonProfileView({ initialData }: PersonProfileViewProps) {
  const router = useRouter();
  const { personId } = router.query;
  const { data, loading } = useFetch<Person>(`/person/${personId}`, undefined, {
    initialData: initialData || undefined,
  });

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
      <PersonProfile person={data} loading={loading} />
    </>
  );
}

const getServerSidePropsFn: GetServerSideProps<
  PersonProfileViewProps,
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any
> = async (context) => {
  const { personId } = context.params;
  const initialData = await api.get<Person>(createUrl(`/person/${personId}`));
  return {
    props: {
      initialData,
    },
  };
};

export const getServerSideProps = withGetServerSideError(getServerSidePropsFn);

export default withError(PersonProfileView);
