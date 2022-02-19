import React from 'react';
import ImageGalleryModal from '@/media-gallery/ImageGalleryModal';
import { Movie } from '@/movies/MovieTypes';
import { useQuery } from 'react-query';
import { apiQueries } from '@/http-client/apiQueries';
import BaseCarousel from '@/common/BaseCarousel';
import ImageCarouselItem from '@/common/ImageCarouselItem';

interface MovieImageCarouselProps {
  movie: Movie;
}

function MovieImageCarousel({ movie }: MovieImageCarouselProps) {
  const movieId = movie.id;
  const { data, isLoading } = useQuery(apiQueries.movies.movieImages(movieId));

  const filePaths = data?.backdrops.map((backdrop) => backdrop.file_path);

  return (
    <>
      <BaseCarousel
        // To reset the carousel as user redirects from movie to another movie
        key={movieId}
        items={filePaths}
        loading={isLoading}
        slidesToShow={{ default: 4, md: 3, sm: 2 }}
        keyExtractor={(filePath) => filePath}
        listEmptyMessage="No image has been found."
        renderItem={(filePath) => {
          return (
            <ImageCarouselItem
              key={filePath}
              filePath={filePath}
              width={16}
              height={9}
            />
          );
        }}
      />
      <ImageGalleryModal title={movie.title} filePaths={filePaths} />
    </>
  );
}

export default MovieImageCarousel;
