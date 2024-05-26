import { BaseImage } from '@/common/base-image';
import { CardLinkArea } from '@/common/card-link-area';
import type { Id } from '@/common/common-types';
import { getYouTubeThumbnailUrl } from '@/medias/media-utils';
import type { MovieVideo } from '@/movies/movie-types';
import { lineClamp } from '@/theme/theme-utils';
import type { CardHeaderProps } from '@mui/material';
import { Card, CardHeader, CardMedia, Skeleton } from '@mui/material';

type MovieVideoCardHeaderProps = Pick<CardHeaderProps, 'title' | 'subheader'>;

function MovieVideoCardHeader(props: MovieVideoCardHeaderProps) {
  return (
    <CardHeader
      titleTypographyProps={{
        sx: {
          ...lineClamp(2),
          typography: { xs: 'body2', md: 'body1' },
          fontWeight: { xs: 'bold', md: 'bold' },
        },
      }}
      subheaderTypographyProps={{
        variant: 'subtitle2',
      }}
      sx={{ padding: 1 }}
      {...props}
    />
  );
}

type MovieVideoProps = {
  movieId: Id;
  video: MovieVideo;
};

export function MovideVideoCard({ movieId, video }: MovieVideoProps) {
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
        <MovieVideoCardHeader title={video.name} subheader={video.type} />
      </CardLinkArea>
    </Card>
  );
}

export function MovieVideoCardSkeleton() {
  return (
    <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
      <CardMedia sx={{ aspectRatio: '16 / 9' }}>
        <Skeleton variant="rounded" height="100%" />
      </CardMedia>
      <MovieVideoCardHeader
        title={<Skeleton />}
        subheader={<Skeleton width="60%" />}
      />
    </Card>
  );
}
