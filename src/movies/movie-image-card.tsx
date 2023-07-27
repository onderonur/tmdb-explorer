import { Card, CardMedia } from '@mui/material';
import { MovieImage } from '@/movies/movie-types';
import { Id } from '@/common/common-types';
import TmdbImage from '@/tmdb/tmdb-image';
import CardLinkArea from '@/common/card-link-area';

type MovieImageCardProps = {
  movieId: Id;
  image: MovieImage;
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
            // TODO: Fix
            // alt={`${movie.title} Image - ${i}`}
            alt="TODO"
            fill
            sx={{ objectFit: 'cover', borderRadius: 1 }}
          />
        </CardMedia>
      </CardLinkArea>
    </Card>
  );
}
