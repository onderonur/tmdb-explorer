import React from 'react';
import BaseImage from '@/common/BaseImage';
import BaseCard from '@/common/BaseCard';
import BaseCardHeader from '@/common/BaseCardHeader';
import MovieRating from './MovieRating';
import { Box, styled, Typography } from '@mui/material';
import NextLink from '@/routing/NextLink';
import { Movie } from '@/movies/MovieTypes';
import useApiConfiguration from '@/api-configuration/useApiConfiguration';
import { getMovieReleaseYear } from '@/movies/MovieUtils';

const MovieCardHeader = styled(BaseCardHeader)(({ theme }) => ({
  paddingBottom: theme.spacing(0.25),
}));

interface MovieCardProps {
  movie: Movie;
  subheader?: string;
}

function MovieCard({ movie, subheader }: MovieCardProps) {
  const { getImageUrl } = useApiConfiguration();
  return (
    <NextLink href={`/movie/${movie.id}`}>
      <BaseCard hasActionArea>
        <BaseImage
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          width={2}
          height={3}
          layout="responsive"
          objectFit="cover"
        />
        <MovieCardHeader title={movie.title} subheader={subheader} />
        <Box display="flex" justifyContent={'space-between'} pb={1} px={1}>
          <Typography
            color={(theme) => theme.palette.text.secondary}
            variant="subtitle2"
          >
            {getMovieReleaseYear(movie)}
          </Typography>
          <MovieRating movie={movie} size="small" />
        </Box>
      </BaseCard>
    </NextLink>
  );
}

export default MovieCard;
