import { CardLinkArea } from '@/common/card-link-area';
import { TmdbImage } from '@/tmdb/tmdb-image';
import { Card, CardMedia } from '@mui/material';

type ImageCardProps = {
  href: string;
  imageSrc: string;
  alt: string;
  aspectRatio: string;
};

export function ImageCard({
  href,
  imageSrc,
  alt,
  aspectRatio,
}: ImageCardProps) {
  return (
    <Card>
      <CardLinkArea href={href}>
        <CardMedia sx={{ position: 'relative', aspectRatio }}>
          <TmdbImage
            src={imageSrc}
            alt={alt}
            fill
            sx={{ objectFit: 'cover', borderRadius: 1 }}
          />
        </CardMedia>
      </CardLinkArea>
    </Card>
  );
}
