import React from 'react';
import ImageGridList from '@/common/ImageGridList';
import ImageGalleryModal from '@/media-gallery/ImageGalleryModal';
import useFetch from '@/common/useFetch';
import { Movie, MovieImage } from '@/common/CommonTypes';

interface MovieImageGridListProps {
  movie: Movie;
}

function MovieImageGridList({ movie }: MovieImageGridListProps) {
  const movieId = movie.id;
  const { data, loading } = useFetch<{ backdrops: MovieImage[] }>(
    `/movie/${movieId}/images`,
  );

  const filePaths = data?.backdrops.map((backdrop) => backdrop.file_path);

  return (
    <>
      <ImageGridList
        filePaths={filePaths}
        isFetching={loading}
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
