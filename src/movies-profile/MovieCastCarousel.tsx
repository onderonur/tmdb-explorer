import React from 'react';
import { ID } from '@/common/CommonTypes';
import { useQuery } from 'react-query';
import { apiQueries } from '@/http-client/apiQueries';
import BaseCarousel from '@/common/BaseCarousel';
import MovieCastCarouselItem from './MovieCastCarouselItem';

interface MovieCastCarouselProps {
  movieId: ID;
}

function MovieCastCarousel({ movieId }: MovieCastCarouselProps) {
  const { data, isLoading } = useQuery(apiQueries.movies.movieCast(movieId));
  const castCredits = data?.cast;

  return (
    <BaseCarousel
      // To reset the carousel as user redirects from movie to another movie
      key={movieId}
      items={castCredits}
      loading={isLoading}
      slidesToShow={{ default: 5, md: 4, sm: 2 }}
      keyExtractor={(castCredit) => castCredit.id}
      renderItem={(castCredit) => {
        return (
          <MovieCastCarouselItem key={castCredit.id} castCredit={castCredit} />
        );
      }}
    />
  );
}

export default MovieCastCarousel;
