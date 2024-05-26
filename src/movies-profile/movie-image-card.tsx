import { CardLinkArea } from '@/common/card-link-area';
import type { Id } from '@/common/common-types';
import type { TImage } from '@/medias/media-types';
import { TmdbImage } from '@/tmdb/tmdb-image';
import { Card, CardMedia, Skeleton } from '@mui/material';

type MovieImageCardProps = {
  movieId: Id;
  image: TImage & { alt: string };
};

export function MovieImageCard({ movieId, image }: MovieImageCardProps) {
  return (
    <Card>
      <CardLinkArea href={`/movies/${movieId}/images${image.file_path}`}>
        <CardMedia sx={{ position: 'relative', aspectRatio: '16 / 9' }}>
          <TmdbImage
            src={image.file_path}
            alt={image.alt}
            fill
            sx={{ objectFit: 'cover', borderRadius: 1 }}
          />
        </CardMedia>
      </CardLinkArea>
    </Card>
  );
}

export function MovieImageCardSkeleton() {
  return (
    <Card>
      <CardMedia sx={{ aspectRatio: '16 / 9' }}>
        <Skeleton variant="rounded" height="100%" />
      </CardMedia>
    </Card>
  );
}
