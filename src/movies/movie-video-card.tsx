import { Card, CardHeader, CardMedia } from '@mui/material';
import { lineClamp } from '@/theme/theme-utils';
import BaseImage from '@/common/base-image';
import { ID } from '@/common/CommonTypes';
import { MovieVideo } from '@/movies/movie-types';
import CardLinkArea from '@/common/card-link-area';
import { getYouTubeThumbnailUrl } from '@/medias/media-utils';

type MovieVideoProps = {
  // TODO: ID'yi Id yap.
  movieId: ID;
  video: MovieVideo;
};

export default function MovideVideoCard({ movieId, video }: MovieVideoProps) {
  return (
    <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
      <CardLinkArea href={`/movies/${movieId}/videos/${video.id}`}>
        <CardMedia sx={{ position: 'relative', aspectRatio: '16 / 9' }}>
          <BaseImage
            src={getYouTubeThumbnailUrl(video.key)}
            alt={video.name}
            sx={{ objectFit: 'cover' }}
            fill
          />
        </CardMedia>
        <CardHeader
          title={video.name}
          titleTypographyProps={{
            sx: lineClamp(2),
            variant: 'subtitle1',
            fontWeight: 'bold',
          }}
          subheader={video.type}
          subheaderTypographyProps={{
            variant: 'subtitle2',
          }}
          sx={{ padding: 1 }}
        />
      </CardLinkArea>
    </Card>
  );
}
