import React from 'react';
import MediaGalleryModal from '@/components/MediaGalleryModal';
import { useRouter } from 'next/router';

function MovieVideoPlayerModal({ videos }) {
  const videoKeys = videos.map((video) => video.key);
  const router = useRouter();
  const { watch } = router.query;
  const videoToWatch = videos.find((video) => video.key === watch);

  return (
    <MediaGalleryModal
      title={videoToWatch?.name}
      dataSource={videoKeys}
      queryParamName="watch"
      isVideoPlayer={true}
    />
  );
}

export default MovieVideoPlayerModal;
