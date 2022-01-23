import React from 'react';
import ImageGridList from '@/common/ImageGridList';
import ImageGalleryModal from '@/media-gallery/ImageGalleryModal';
import { Movie } from '@/common/CommonTypes';
import { useQuery } from 'react-query';
import { apiQueries } from '@/http-client/apiQueries';

interface MovieImageGridListProps {
  movie: Movie;
}

function MovieImageGridList({ movie }: MovieImageGridListProps) {
  const movieId = movie.id;
  const { data, isLoading } = useQuery(apiQueries.movies.movieImages(movieId));

  const filePaths = data?.backdrops.map((backdrop) => backdrop.file_path);

  return (
    <>
      <ImageGridList
        filePaths={filePaths}
        isFetching={isLoading}
        imgSize={{
          width: 16,
          height: 9,
        }}
      />
      <ImageGalleryModal title={movie.title} filePaths={filePaths} />
    </>
  );
}

export default MovieImageGridList;
