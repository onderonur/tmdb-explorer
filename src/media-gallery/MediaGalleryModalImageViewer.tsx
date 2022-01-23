import React from 'react';
import BaseImage from '@/common/BaseImage';
import useApiConfiguration from '@/api-configuration/useApiConfiguration';

interface MediaGalleryModalImageViewerProps {
  filePath: string;
}

function MediaGalleryModalImageViewer({
  filePath,
}: MediaGalleryModalImageViewerProps) {
  const { getImageUrl } = useApiConfiguration();

  return (
    <BaseImage
      src={getImageUrl(filePath, {
        original: true,
      })}
      width={16}
      height={9}
      layout="responsive"
      objectFit="contain"
    />
  );
}

export default MediaGalleryModalImageViewer;
