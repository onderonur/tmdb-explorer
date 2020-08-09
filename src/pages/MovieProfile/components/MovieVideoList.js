import React from 'react';
import BaseList from '@/components/BaseList';
import LoadingIndicator from '@/components/LoadingIndicator';
import MovieVideoListItem from './MovieVideoListItem';
import MovieVideoPlayerModal from './MovieVideoPlayerModal';
import useFetch from '@/hooks/useFetch';

function MovieVideoList({ movieId }) {
  const { data, loading } = useFetch(`/movie/${movieId}/videos`);
  const videos = data?.results;
  return (
    <LoadingIndicator loading={loading}>
      <BaseList
        data={videos}
        renderItem={(video) => (
          <MovieVideoListItem key={video.id} video={video} />
        )}
        listEmptyMesage="No video has been found"
      />
      <MovieVideoPlayerModal videos={videos} />
    </LoadingIndicator>
  );
}

export default MovieVideoList;
