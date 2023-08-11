import { Card, CardMedia } from '@mui/material';
import { Id } from '@/common/common-types';
import TmdbImage from '@/tmdb/tmdb-image';
import CardLinkArea from '@/common/card-link-area';
import { TImage } from '@/medias/media-types';

type MovieImageCardProps = {
  movieId: Id;
  image: TImage & { alt: string };
};

export default function MovieImageCard({
  movieId,
  image,
}: MovieImageCardProps) {
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
