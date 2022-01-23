import React from 'react';
import { Typography, Box, Grid, styled } from '@mui/material';
import Introduction from '@/introduction/Introduction';
import { Person } from '@/common/CommonTypes';
import ImdbLink, { ImdbProfileType } from '../introduction/ImdbLink';

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
        <>
          <Grid container spacing={2}>
            {person.imdb_id && (
              <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                  <ImdbLink
                    type={ImdbProfileType.PERSON}
                    imdbId={person.imdb_id}
                  />
                </Box>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Biography
              </Typography>
              <Biography variant="body2">{person.biography}</Biography>
            </Grid>
          </Grid>
        </>
      }
    />
  );
}

export default PersonIntroduction;
