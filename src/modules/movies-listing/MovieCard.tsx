import React from 'react';
import BaseImage from '@/modules/shared/BaseImage';
import BaseCard from '@/modules/shared/BaseCard';
import BaseCardHeader from '@/modules/shared/BaseCardHeader';
import MovieRatingTag from './MovieRatingTag';
import { getAspectRatioString } from '../shared/AspectRatio';
import { useApiConfiguration } from '@/modules/api-configuration/ApiConfigurationContext';
import { Box, makeStyles } from '@material-ui/core';
import NextLink from '@/modules/routing/NextLink';
import { Movie } from '@/modules/shared/SharedTypes';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
}));

interface MovieCardProps {
  movie: Movie;
  subheader?: string;
}

function MovieCard({ movie, subheader }: MovieCardProps) {
  const classes = useStyles();
  const { getImageUrl } = useApiConfiguration();
  return (
    <NextLink className={classes.link} href={`/movie/${movie.id}`}>
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
