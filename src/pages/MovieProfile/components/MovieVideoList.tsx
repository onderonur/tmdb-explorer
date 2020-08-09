import React from 'react';
import BaseList from '@/components/BaseList';
import LoadingIndicator from '@/components/LoadingIndicator';
import MovieVideoListItem from './MovieVideoListItem';
import MovieVideoPlayerModal from './MovieVideoPlayerModal';
import useFetch from '@/hooks/useFetch';
import { ID, InfiniteFetchResponse, MovieVideo } from '@/types';

interface MovieVideoListProps {
  movieId: ID;
}

function renderItem(video: MovieVideo) {
  return <MovieVideoListItem key={video.id} video={video} />;
}

function MovieVideoList({ movieId }: MovieVideoListProps) {
  const { data, loading } = useFetch<InfiniteFetchResponse<MovieVideo>>(
    `/movie/${movieId}/videos`,
  );
  const videos = data?.results || [];
  return (
    <LoadingIndicator loading={loading}>
      <BaseList
        data={videos}
        renderItem={renderItem}
        listEmptyMessage="No video has been found"
      />
      <MovieVideoPlayerModal videos={videos} />
    </LoadingIndicator>
  );
}

export default MovieVideoList;
