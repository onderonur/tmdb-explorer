import React from 'react';
import ImageGridList from '@/components/ImageGridList';
import ImageGalleryModal from '@/components/ImageGalleryModal';
import { getAspectRatioString } from '@/components/AspectRatio';
import useFetch from '@/hooks/useFetch';
import { Movie, MovieImage } from '@/types';

interface MovieImageGridListProps {
  movie: Movie;
}

function MovieImageGridList({ movie }: MovieImageGridListProps) {
  const movieId = movie.id;
  const { data, loading } = useFetch<{ backdrops: MovieImage[] }>(
    `/movie/${movieId}/images`,
  );

  const {} = useFetch<{ backdrops: MovieImage[] }>(`/movie/${movieId}/images`);

  const {} = useFetch<{ backdrops: MovieImage[] }>(`/movie/${movieId}/images`);

  const {} = useFetch<{ backdrops: MovieImage[] }>(`/movie/${movieId}/images`);
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
