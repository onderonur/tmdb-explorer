import React from 'react';
import MovieVideoCarouselItem from './MovieVideoCarouselItem';
import VideoGalleryModal from '@/media-gallery/VideoGalleryModal';
import { ID } from '@/common/CommonTypes';
import { useQuery } from 'react-query';
import { apiQueries } from '@/http-client/apiQueries';
import BaseCarousel from '@/common/BaseCarousel';
import { idExtractor } from '@/common/CommonUtils';

interface MovieVideoCarouselProps {
  movieId: ID;
}

function MovieVideoCarousel({ movieId }: MovieVideoCarouselProps) {
  const { data, isLoading } = useQuery(apiQueries.movies.movieVideos(movieId));
  const videos = data?.results || [];
  return (
    <>
      <BaseCarousel
        // To reset the carousel as user redirects from movie to another movie
        key={movieId}
        items={videos}
        loading={isLoading}
        slidesToShow={{ default: 5, md: 4, sm: 2 }}
        keyExtractor={idExtractor}
        listEmptyMessage="No video has been found."
        renderItem={(video) => {
          return <MovieVideoCarouselItem video={video} />;
        }}
      />
      <VideoGalleryModal videos={videos} />
    </>
  );
}

export default MovieVideoCarousel;
