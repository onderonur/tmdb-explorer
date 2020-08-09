import React from 'react';
import { Typography } from '@material-ui/core';
import Profile from '@/components/Profile';
import PersonInfo from './components/PersonInfo';
import PersonIntroduction from './components/PersonIntroduction';
import PersonImageGridList from './components/PersonImageGridList';
import PersonCastingGridList from './components/PersonCastingGridList';
import useFetch from '@/hooks/useFetch';
import { useRouter } from 'next/router';
import { api, createUrl } from '@utils';
import BaseSeo from '@components/BaseSeo';
import { useConfiguration } from '@contexts/ConfigurationContext';

function PersonProfile({ initialData }) {
  const router = useRouter();
  const { personId } = router.query;
  const { data, loading } = useFetch(`/person/${personId}`, undefined, {
    initialData,
  });

  const { getImageUrl } = useConfiguration();

  return (
    <>
      <BaseSeo
        title={data.name}
        description={data.biography}
        openGraph={{ images: [{ url: getImageUrl(data.profile_path) }] }}
      />
      <Profile
        loading={loading}
        introduction={<PersonIntroduction person={data} />}
        leftSide={
          <>
            <Typography variant="h6" gutterBottom>
              Personal Info
            </Typography>
            <PersonInfo person={data} />
          </>
        }
        main={
          <>
            <Typography variant="h6" gutterBottom>
              Images
            </Typography>
            <PersonImageGridList person={data} />

            <Typography variant="h6" gutterBottom>
              Castings
            </Typography>
            <PersonCastingGridList personId={personId} />
          </>
        }
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { personId } = context.params;
  const initialData = await api.get(createUrl(`/person/${personId}`));
  return {
    props: {
      initialData,
    },
  };
}

export default PersonProfile;
