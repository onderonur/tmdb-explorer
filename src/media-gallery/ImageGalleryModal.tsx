import MediaGalleryModal from './MediaGalleryModal';
import { Maybe } from '@/common/CommonTypes';
import useApiConfiguration from '@/api-configuration/ApiConfigurationHooks';
import BaseImage, { imageProps } from '@/common/BaseImage';
import { IconButton, styled } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

const FullScreenButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

interface ImageGalleryModalProps {
  title: string;
  filePaths: Maybe<string[]>;
}

function ImageGalleryModal({ title, filePaths }: ImageGalleryModalProps) {
  const { getImageUrl } = useApiConfiguration();

  return (
    <MediaGalleryModal
      title={title}
      dataSource={filePaths}
      queryParamName="view"
      renderMedia={({ mediaSrc, isFullScreen, toggleFullScreen }) => {
        return (
          <>
            <BaseImage
              src={getImageUrl(mediaSrc, {
                quality: 'original',
              })}
              alt={title}
              {...imageProps.responsive({ aspectRatio: '16 / 9' })}
            />
            <FullScreenButton
              aria-label={isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              onClick={toggleFullScreen}
            >
              {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </FullScreenButton>
          </>
        );
      }}
    />
  );
}

export default ImageGalleryModal;
