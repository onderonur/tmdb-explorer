import React from 'react';
import MediaGalleryModal from './MediaGalleryModal';
import { Maybe } from '@/common/CommonTypes';

interface ImageGalleryModalProps {
  title: string;
  filePaths: Maybe<string[]>;
}

function ImageGalleryModal({ title, filePaths }: ImageGalleryModalProps) {
  return (
    <MediaGalleryModal
      title={title}
      dataSource={filePaths}
      queryParamName="view"
    />
  );
}

export default ImageGalleryModal;
