import React from 'react';
import MediaGalleryModal from './MediaGalleryModal';
import { Maybe } from '@/common/CommonTypes';
import useApiConfiguration from '@/api-configuration/useApiConfiguration';
import BaseImage from '@/common/BaseImage';
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
                original: true,
              })}
              width={16}
              height={9}
              layout="responsive"
              objectFit="contain"
            />
            <FullScreenButton onClick={toggleFullScreen}>
              {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </FullScreenButton>
          </>
        );
      }}
    />
  );
}

export default ImageGalleryModal;
