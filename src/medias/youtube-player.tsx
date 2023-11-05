import { Box } from '@mui/material';

type YouTubePlayerProps = {
  youTubeId: string;
};

export default function YouTubePlayer({ youTubeId }: YouTubePlayerProps) {
  return (
    <Box
      component="iframe"
      // Key is added to unmount the iframe everytime youTubeId changes.
      // Otherwise, iframe messes up with the browser history.
      key={youTubeId}
      title="YouTubePlayer"
      src={`https://www.youtube.com/embed/${youTubeId}`}
      allowFullScreen
      sx={{
        display: 'block',
        aspectRatio: '16 / 9',
        width: '100%',
        border: 0,
      }}
    />
  );
}
