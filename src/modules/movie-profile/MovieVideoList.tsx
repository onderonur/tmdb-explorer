import React from 'react';
import BaseList from '@/modules/shared/BaseList';
import LoadingIndicator from '@/modules/shared/LoadingIndicator';
import MovieVideoListItem from './MovieVideoListItem';
import MovieVideoPlayerModal from '@/modules/media-gallery/VideoPlayerModal';
import useFetch from '@/modules/shared/useFetch';
import { ID, InfiniteFetchResponse } from '@/modules/shared/SharedTypes';
import { MovieVideo } from '../media-gallery/MediaGalleryTypes';

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
