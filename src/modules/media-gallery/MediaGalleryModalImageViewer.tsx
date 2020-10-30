import React from 'react';
import BaseImage from '@/modules/shared/BaseImage';
import { getAspectRatioString } from '@/modules/shared/AspectRatio';
import { useApiConfiguration } from '@/modules/api-configuration/ApiConfigurationContext';

interface MediaGalleryModalImageViewerProps {
  filePath: string;
}

function MediaGalleryModalImageViewer({
  filePath,
}: MediaGalleryModalImageViewerProps) {
  const { getImageUrl } = useApiConfiguration();

  return (
    <BaseImage
      // Added this key to recreate the component when the "file_path" changes.
      // Without this, when user clicks the "next" or "previous" button, it waits image to load to rerender.
      key={filePath || '0'}
      src={getImageUrl(filePath, {
        original: true,
      })}
      aspectRatio={getAspectRatioString(16, 9)}
      objectFit="contain"
      showFallbackWhileLoading={true}
    />
  );
}

export default MediaGalleryModalImageViewer;
