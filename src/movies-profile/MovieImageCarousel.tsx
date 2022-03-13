import React from 'react';
import ImageGalleryModal from '@/media-gallery/ImageGalleryModal';
import { Movie } from '@/movies/MoviesTypes';
import { useQuery } from 'react-query';
import BaseCarousel from '@/common/BaseCarousel';
import ImageCarouselItem from '@/common/ImageCarouselItem';
import { movieQueries } from '@/movies/movieQueries';

interface MovieImageCarouselProps {
  movie: Movie;
}

function MovieImageCarousel({ movie }: MovieImageCarouselProps) {
  const movieId = movie.id;
  const { data, isLoading } = useQuery(movieQueries.movieDetails(movieId));

  const filePaths = data?.movieImages.backdrops.map(
    (backdrop) => backdrop.file_path,
  );

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
        renderItem={(filePath, i) => {
          return (
            <ImageCarouselItem
              key={filePath}
              filePath={filePath}
              imageAlt={`Movie Carousel Image ${i + 1}`}
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
