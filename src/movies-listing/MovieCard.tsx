import React from 'react';
import BaseImage from '@/common/BaseImage';
import BaseCard from '@/common/BaseCard';
import BaseCardHeader from '@/common/BaseCardHeader';
import MovieRatingTag from './MovieRatingTag';
import { Box } from '@mui/material';
import NextLink from '@/routing/NextLink';
import { Movie } from '@/common/CommonTypes';
import useApiConfiguration from '@/api-configuration/useApiConfiguration';

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
        <Box position="absolute" top={0} left={0}>
          <MovieRatingTag movie={movie} />
        </Box>
        <BaseCardHeader title={movie.title} subheader={subheader} />
      </BaseCard>
    </NextLink>
  );
}

export default MovieCard;
