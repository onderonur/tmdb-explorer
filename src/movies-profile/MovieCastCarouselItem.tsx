import NextLink from '@/routing/NextLink';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import useApiConfiguration from '@/api-configuration/ApiConfigurationHooks';
import { MovieCast } from '@/movies/MoviesTypes';

const AVATAR_SIZE = 82;

interface MovieCastCarouselItemProps {
  castCredit: MovieCast;
}

function MovieCastCarouselItem({ castCredit }: MovieCastCarouselItemProps) {
  const { getImageUrl } = useApiConfiguration();

  return (
    <NextLink href={`/person/${castCredit.id}`}>
      <Stack spacing={2} alignItems="center">
        <Avatar
          src={getImageUrl(castCredit.profile_path)}
          alt={castCredit.name}
          sx={{ height: AVATAR_SIZE, width: AVATAR_SIZE }}
        />
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="subtitle1"
            color={(theme) => theme.palette.text.primary}
          >
            {castCredit.name}
          </Typography>
          <Typography
            variant="subtitle2"
            color={(theme) => theme.palette.text.secondary}
          >
            {castCredit.character}
          </Typography>
        </Box>
      </Stack>
    </NextLink>
  );
}

export default MovieCastCarouselItem;
