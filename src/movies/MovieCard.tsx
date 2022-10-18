import BaseImage from '@/common/BaseImage';
import BaseCard from '@/common/BaseCard';
import BaseCardHeader from '@/common/BaseCardHeader';
import MovieRating from './MovieRating';
import { Box, Typography } from '@mui/material';
import { Movie } from '@/movies/MoviesTypes';
import useApiConfiguration from '@/api-configuration/useApiConfiguration';
import { getMovieReleaseYear } from '@/movies/MoviesUtils';

interface MovieCardProps {
  movie: Movie;
  subheader?: string;
}

function MovieCard({ movie, subheader }: MovieCardProps) {
  const { getImageUrl } = useApiConfiguration();

  return (
    <BaseCard href={`/movie/${movie.id}`}>
      <BaseImage
        src={getImageUrl(movie.poster_path)}
        alt={movie.title}
        width={2}
        height={3}
        layout="responsive"
        objectFit="cover"
      />
      <BaseCardHeader
        title={movie.title}
        subheader={subheader}
        sx={{ paddingBottom: 0.25 }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingBottom: 1,
          paddingX: 1,
        }}
      >
        <Typography
          color={(theme) => theme.palette.text.secondary}
          variant="subtitle2"
        >
          {getMovieReleaseYear(movie)}
        </Typography>
        <MovieRating movie={movie} size="small" />
      </Box>
    </BaseCard>
  );
}

export default MovieCard;
