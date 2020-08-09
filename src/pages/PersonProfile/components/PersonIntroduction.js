import React from 'react';
import { Typography, makeStyles, Box, Grid, Link } from '@material-ui/core';
import { getImdbProfileUrl } from '@/utils';
import Introduction from '@/components/Introduction';
import ImdbLogo from '@/components/ImdbLogo';

const useStyles = makeStyles((theme) => ({
  biography: {
    whiteSpace: 'pre-wrap',
  },
}));

function PersonIntroduction({ person }) {
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
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Link
                  href={getImdbProfileUrl(person.imdb_id)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ImdbLogo />
                </Link>
              </Box>
            </Grid>
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
