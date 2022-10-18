import MovieVideoCarouselItem from './MovieVideoCarouselItem';
import VideoGalleryModal from '@/media-gallery/VideoGalleryModal';
import { ID } from '@/common/CommonTypes';
import { useQuery } from '@tanstack/react-query';
import BaseCarousel from '@/common/BaseCarousel';
import { moviesAPI } from '@/movies/moviesAPI';

interface MovieVideoCarouselProps {
  movieId: ID;
}

function MovieVideoCarousel({ movieId }: MovieVideoCarouselProps) {
  const { data, isLoading } = useQuery(moviesAPI.movieDetails(movieId));
  const videos = data?.videos.results || [];
  return (
    <>
      <BaseCarousel
        // To reset the carousel as user redirects from movie to another movie
        key={movieId}
        loading={isLoading}
        slidesPerView={{ default: 2, md: 4, lg: 5 }}
        listEmptyMessage="No video has been found."
      >
        {videos.map((video) => {
          return <MovieVideoCarouselItem key={video.id} video={video} />;
        })}
      </BaseCarousel>
      <VideoGalleryModal videos={videos} />
    </>
  );
}

export default MovieVideoCarousel;
