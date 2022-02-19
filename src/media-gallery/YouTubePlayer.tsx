import React from 'react';
import AspectRatio from '../common/AspectRatio';

interface YouTubePlayerProps {
  youTubeId: string;
}

function YouTubePlayer({ youTubeId }: YouTubePlayerProps) {
  return (
    <AspectRatio aspectRatio={16 / 9}>
      <iframe
        // Key is added to unmount the iframe everytime youTubeId changes.
        // Otherwise, iframe messes up with the browser history.
        key={youTubeId}
        title="YouTubePlayer"
        src={`https://www.youtube.com/embed/${youTubeId}`}
        frameBorder="0"
        allowFullScreen
      />
    </AspectRatio>
  );
}

export default YouTubePlayer;
