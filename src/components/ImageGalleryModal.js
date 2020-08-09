import React from 'react';
import MediaGalleryModal from './MediaGalleryModal';

function ImageGalleryModal({ title, filePaths }) {
  return (
    <MediaGalleryModal
      title={title}
      dataSource={filePaths}
      queryParamName="view"
    />
  );
}

export default ImageGalleryModal;
