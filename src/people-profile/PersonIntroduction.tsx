import React from 'react';
import { Typography, Box, Grid, makeStyles } from '@material-ui/core';
import Introduction from '@/introduction/Introduction';
import { Person } from '@/common/CommonTypes';
import ImdbLink, { ImdbProfileType } from '../introduction/ImdbLink';

const useStyles = makeStyles(() => ({
  biography: {
    whiteSpace: 'pre-wrap',
  },
}));

interface PersonIntroductionProps {
  person: Person;
}

function PersonIntroduction({ person }: PersonIntroductionProps) {
  const classes = useStyles();

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
              <Typography className={classes.biography} variant="body2">
                {person.biography}
              </Typography>
            </Grid>
          </Grid>
        </>
      }
    />
  );
}

export default PersonIntroduction;
