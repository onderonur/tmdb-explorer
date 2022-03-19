import { ID } from '@/common/CommonTypes';
import { useQuery } from 'react-query';
import BaseCarousel from '@/common/BaseCarousel';
import MovieCastCarouselItem from './MovieCastCarouselItem';
import { movieQueries } from '@/movies/movieQueries';

interface MovieCastCarouselProps {
  movieId: ID;
}

function MovieCastCarousel({ movieId }: MovieCastCarouselProps) {
  const { data, isLoading } = useQuery(movieQueries.movieDetails(movieId));
  const castCredits = data?.credits.cast;

  return (
    <BaseCarousel
      // To reset the carousel as user redirects from movie to another movie
      key={movieId}
      loading={isLoading}
      slidesToShow={{ default: 5, md: 4, sm: 2 }}
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
