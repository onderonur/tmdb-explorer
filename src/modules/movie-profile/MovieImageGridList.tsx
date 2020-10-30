import React from 'react';
import ImageGridList from '@/modules/shared/ImageGridList';
import ImageGalleryModal from '@/modules/media-gallery/ImageGalleryModal';
import { getAspectRatioString } from '@/modules/shared/AspectRatio';
import useFetch from '@/modules/shared/useFetch';
import { Movie, MovieImage } from '@/modules/shared/SharedTypes';

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
        aspectRatio={getAspectRatioString(16, 9)}
      />
      <ImageGalleryModal title={movie.title} filePaths={filePaths} />
    </>
  );
}

export default MovieImageGridList;
