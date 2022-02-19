import React from 'react';
import { useRouter } from 'next/router';
import MediaGalleryModal from '@/media-gallery/MediaGalleryModal';
import { MovieVideo } from './MediaGalleryTypes';
import YouTubePlayer from './YouTubePlayer';

interface VideoGalleryModalProps {
  videos: MovieVideo[];
}

function VideoGalleryModal({ videos }: VideoGalleryModalProps) {
  const videoKeys = videos.map((video) => video.key);
  const router = useRouter();
  const { watch } = router.query;
  const videoToWatch = videos.find((video) => video.key === watch);

  return (
    <MediaGalleryModal
      title={videoToWatch?.name || ''}
      dataSource={videoKeys}
      queryParamName="watch"
      renderMedia={({ mediaSrc }) => {
        return <YouTubePlayer youTubeId={mediaSrc} />;
      }}
    />
  );
}

export default VideoGalleryModal;
