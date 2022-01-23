import React from 'react';
import { Typography } from '@mui/material';
import Profile from '@/profile/Profile';
import PersonInfo from './PersonInfo';
import PersonIntroduction from './PersonIntroduction';
import PersonImageGridList from './PersonImageGridList';
import PersonCastingGridList from '@/people-profile/PersonCastingGridList';
import { Maybe, Person } from '@/common/CommonTypes';

interface PersonProfileProps {
  person: Maybe<Person>;
  loading: boolean;
}

function PersonProfile({ person, loading }: PersonProfileProps) {
  const personId = person?.id;

  return (
    <Profile
      loading={loading}
      introduction={person && <PersonIntroduction person={person} />}
      leftSide={
        person && (
          <>
            <Typography variant="h6" gutterBottom>
              Personal Info
            </Typography>
            <PersonInfo person={person} />
          </>
        )
      }
      main={
        person && (
          <>
            <Typography variant="h6" gutterBottom>
              Images
            </Typography>
            <PersonImageGridList person={person} />

            <Typography variant="h6" gutterBottom>
              Castings
            </Typography>
            {typeof personId === 'number' && (
              <PersonCastingGridList personId={personId} />
            )}
          </>
        )
      }
    />
  );
}

export default PersonProfile;
