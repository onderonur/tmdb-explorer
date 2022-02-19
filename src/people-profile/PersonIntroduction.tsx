import React from 'react';
import { Typography, Box, styled, Stack } from '@mui/material';
import Introduction from '@/introduction/Introduction';
import ImdbLink, { ImdbProfileType } from '../introduction/ImdbLink';
import { Person } from '@/people/PeopleTypes';
import PersonInfo from './PersonInfo';

const Biography = styled(Typography)({
  whiteSpace: 'pre-wrap',
});
interface PersonIntroductionProps {
  person: Person;
}

function PersonIntroduction({ person }: PersonIntroductionProps) {
  if (!person) {
    return null;
  }

  return (
    <Introduction
      imageSrc={person.profile_path}
      backgroundImageSrc={person.profile_path}
      title={person.name}
      content={
        <Stack spacing={2}>
          {person.imdb_id && (
            <div>
              <Box display="flex" alignItems="center">
                <ImdbLink
                  type={ImdbProfileType.PERSON}
                  imdbId={person.imdb_id}
                />
              </Box>
            </div>
          )}
          <div>
            <Typography variant="h6" gutterBottom>
              Biography
            </Typography>
            <Biography variant="body2">{person.biography}</Biography>
          </div>
          <div>
            <Typography variant="h6" gutterBottom>
              Personal Info
            </Typography>
            <PersonInfo person={person} />
          </div>
        </Stack>
      }
    />
  );
}

export default PersonIntroduction;
