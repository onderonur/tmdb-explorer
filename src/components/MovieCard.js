import React from 'react';
import BaseImage from '@/components/BaseImage';
import BaseCard from '@/components/BaseCard';
import { makeStyles } from '@material-ui/styles';
import BaseCardHeader from '@/components/BaseCardHeader';
import MovieRatingTag from './MovieRatingTag';
import { getAspectRatioString } from './AspectRatio';
import { useConfiguration } from '@/contexts/ConfigurationContext';
import { Box } from '@material-ui/core';
import NextLink from './NextLink';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
}));

function MovieCard({ movie, subheader }) {
  const classes = useStyles();
  const { getImageUrl } = useConfiguration();
  return (
    <NextLink
      className={classes.link}
      href="/movie/[movieId]"
      as={`/movie/${movie.id}`}
    >
      <BaseCard hasActionArea>
        <BaseImage
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          aspectRatio={getAspectRatioString(2, 3)}
        />
        <Box position="absolute" top={0} left={0}>
          <MovieRatingTag movie={movie} />
        </Box>
        <BaseCardHeader title={movie.title} subheader={subheader} />
      </BaseCard>
    </NextLink>
  );
}

export default MovieCard;
