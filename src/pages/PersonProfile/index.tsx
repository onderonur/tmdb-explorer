import React from 'react';
import { Typography } from '@material-ui/core';
import Profile from '@/components/Profile';
import PersonInfo from './components/PersonInfo';
import PersonIntroduction from './components/PersonIntroduction';
import PersonImageGridList from './components/PersonImageGridList';
import PersonCastingGridList from './components/PersonCastingGridList';
import useFetch from '@/hooks/useFetch';
import { useRouter } from 'next/router';
import { api, createUrl } from '@/utils';
import BaseSeo from '@/components/BaseSeo';
import { useConfiguration } from '@/contexts/ConfigurationContext';
import { Person } from '@/types';
import { GetServerSideProps } from 'next';
import withError, {
  withGetServerSideError,
  ServerSideProps,
} from '@/hocs/withError';

type PersonProfileProps = ServerSideProps<Person>;

function PersonProfile({ initialData }: PersonProfileProps) {
  const router = useRouter();
  const { personId } = router.query;
  const { data, loading } = useFetch<Person>(`/person/${personId}`, undefined, {
    initialData: initialData || undefined,
  });

  const { getImageUrl } = useConfiguration();

  return (
    <>
      {data && (
        <BaseSeo
          title={data.name}
          description={data.biography || undefined}
          openGraph={{ images: [{ url: getImageUrl(data.profile_path) }] }}
        />
      )}
      <Profile
        loading={loading}
        introduction={data && <PersonIntroduction person={data} />}
        leftSide={
          data && (
            <>
              <Typography variant="h6" gutterBottom>
                Personal Info
              </Typography>
              <PersonInfo person={data} />
            </>
          )
        }
        main={
          data && (
            <>
              <Typography variant="h6" gutterBottom>
                Images
              </Typography>
              <PersonImageGridList person={data} />

              <Typography variant="h6" gutterBottom>
                Castings
              </Typography>
              <PersonCastingGridList personId={data.id} />
            </>
          )
        }
      />
    </>
  );
}

const getServerSidePropsFn: GetServerSideProps<
  PersonProfileProps,
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

export default withError(PersonProfile);
