import React from 'react';
import { Stack, Typography } from '@mui/material';
import PersonIntroduction from './PersonIntroduction';
import PersonImageCarousel from './PersonImageCarousel';
import PersonCastingGridList from '@/people-profile/PersonCastingGridList';
import { Maybe } from '@/common/CommonTypes';
import LoadingIndicator from '@/common/LoadingIndicator';
import { Person } from '@/people/PeopleTypes';

interface PersonProfileProps {
  person: Maybe<Person>;
  loading: boolean;
}

function PersonProfile({ person, loading }: PersonProfileProps) {
  return (
    <LoadingIndicator loading={loading}>
      {person && (
        <Stack spacing={2}>
          <PersonIntroduction person={person} />
          <div>
            <Typography variant="h6" gutterBottom>
              Images
            </Typography>
            <PersonImageCarousel person={person} />
          </div>
          <div>
            <Typography variant="h6" gutterBottom>
              Castings
            </Typography>
            <PersonCastingGridList personId={person.id} />
          </div>
        </Stack>
      )}
    </LoadingIndicator>
  );
}

export default PersonProfile;
