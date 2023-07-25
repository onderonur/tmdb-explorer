import MovieRating from './movie-rating';
import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { MovieListItem } from '@/movies/movie-types';
import { getMovieReleaseYear } from '@/movies/movie-utils';
import TmdbImage from '@/tmdb/tmdb-image';
import CardLinkArea from '@/common/card-link-area';

type MovieCardProps = {
  movie: MovieListItem;
  subheader?: string;
};

export default function MovieCard({ movie, subheader }: MovieCardProps) {
  // TODO: CardContent CardHeader vs kullanmaya gerek var mı direkt yapılabilir mi Box'larla vs bi bak.
  return (
    <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
      <CardLinkArea href={`/movies/${movie.id}`}>
        <Box sx={{ position: 'relative', aspectRatio: '2 / 3' }}>
          <TmdbImage
            src={movie.poster_path}
            alt={movie.title}
            fill
            sx={{ objectFit: 'cover' }}
          />
        </Box>
        <CardHeader
          title={movie.title}
          titleTypographyProps={{
            variant: 'body2',
            fontWeight: 'bold',
          }}
          subheader={subheader}
          subheaderTypographyProps={{
            variant: 'subtitle2',
          }}
          sx={{ padding: 1, paddingBottom: 0.25 }}
        />
        <CardContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingX: 1,
            paddingTop: 0,
            paddingBottom: 1,
          }}
        >
          <Typography
            variant="subtitle2"
            component="p"
            sx={{ color: 'text.secondary' }}
          >
            {getMovieReleaseYear(movie)}
          </Typography>
          <MovieRating movie={movie} sx={{ typography: 'subtitle2' }} />
        </CardContent>
      </CardLinkArea>
    </Card>
  );
}
