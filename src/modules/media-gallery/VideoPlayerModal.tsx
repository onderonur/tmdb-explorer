import React from 'react';
import { useRouter } from 'next/router';
import { MovieVideo } from '@/modules/shared/SharedTypes';
import MediaGalleryModal from '@/modules/media-gallery/MediaGalleryModal';

interface VideoPlayerModalProps {
  videos: MovieVideo[];
}

function VideoPlayerModal({ videos }: VideoPlayerModalProps) {
  const videoKeys = videos.map((video) => video.key);
  const router = useRouter();
  const { watch } = router.query;
  const videoToWatch = videos.find((video) => video.key === watch);

  return (
    <MediaGalleryModal
      title={videoToWatch?.name || ''}
      dataSource={videoKeys}
      queryParamName="watch"
      isVideoPlayer={true}
    />
  );
}

export default VideoPlayerModal;
