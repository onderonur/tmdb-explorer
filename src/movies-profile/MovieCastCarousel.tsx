import { ID } from '@/common/CommonTypes';
import { useQuery } from '@tanstack/react-query';
import BaseCarousel from '@/common/BaseCarousel';
import MovieCastCarouselItem from './MovieCastCarouselItem';
import { moviesAPI } from '@/movies/moviesAPI';

interface MovieCastCarouselProps {
  movieId: ID;
}

function MovieCastCarousel({ movieId }: MovieCastCarouselProps) {
  const { data, isLoading } = useQuery(moviesAPI.movieDetails(movieId));
  const castCredits = data?.credits.cast;

  return (
    <BaseCarousel
      // To reset the carousel as user redirects from movie to another movie
      key={movieId}
      loading={isLoading}
      slidesPerView={{ default: 2, md: 4, lg: 5 }}
    >
      {castCredits?.map((castCredit) => {
        return (
          <MovieCastCarouselItem key={castCredit.id} castCredit={castCredit} />
        );
      })}
    </BaseCarousel>
  );
}

export default MovieCastCarousel;
