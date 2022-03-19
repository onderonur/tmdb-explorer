import { useRouter } from 'next/router';
import MediaGalleryModal from '@/media-gallery/MediaGalleryModal';
import YouTubePlayer from './YouTubePlayer';
import { MovieVideo } from '@/movies/MoviesTypes';

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
