import React from 'react';
import BaseList from '@/common/BaseList';
import LoadingIndicator from '@/common/LoadingIndicator';
import MovieVideoListItem from './MovieVideoListItem';
import MovieVideoPlayerModal from '@/media-gallery/VideoPlayerModal';
import { ID } from '@/common/CommonTypes';
import { MovieVideo } from '../media-gallery/MediaGalleryTypes';
import { useQuery } from 'react-query';
import { apiQueries } from '@/http-client/apiQueries';

interface MovieVideoListProps {
  movieId: ID;
}

function renderItem(video: MovieVideo) {
  return <MovieVideoListItem key={video.id} video={video} />;
}

function MovieVideoList({ movieId }: MovieVideoListProps) {
  const { data, isLoading } = useQuery(apiQueries.movies.movieVideos(movieId));
  const videos = data?.results || [];
  return (
    <LoadingIndicator loading={isLoading}>
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
