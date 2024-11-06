import { AppHeaderOffset } from '@/core/layouts/app-header';
import { getMetadata } from '@/core/seo/seo.utils';
import { lineClamp, responsiveBorderRadius } from '@/core/theme/theme.utils';
import { BaseAvatar } from '@/core/ui/components/base-avatar';
import { CardHeaderWithAvatar } from '@/core/ui/components/card-header-with-avatar';
import { ListItemLink } from '@/core/ui/components/list-item-link';
import { Padder } from '@/core/ui/components/padder';
import { YouTubePlayer } from '@/features/media/components/youtube-player';
import { getYouTubeThumbnailUrl } from '@/features/media/media.utils';
import { getMovie, getMovieVideos } from '@/features/movies/movies.data';
import {
  Box,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { notFound } from 'next/navigation';

async function getPageData({
  movieId,
  videoId,
}: {
  movieId: string;
  videoId: string;
}) {
  const [movie, videos] = await Promise.all([
    getMovie(Number(movieId)),
    getMovieVideos(Number(movieId)),
  ]);

  if (!movie) notFound();

  const videoToWatch = videos.find((video) => video.id === videoId);

  if (!videoToWatch) notFound();

  return { movie, videos, videoToWatch };
}

type MovieVideoPageProps = {
  params: {
    movieId: string;
    videoId: string;
  };
};

export async function generateMetadata({
  params: { movieId, videoId },
}: MovieVideoPageProps) {
  const { movie, videoToWatch } = await getPageData({ movieId, videoId });

  return getMetadata({
    title: `${videoToWatch.name} | ${movie.title}`,
    description: `Watch "${videoToWatch.name}" video of "${movie.title}"`,
    pathname: `/movies/${movieId}/videos/${videoId}`,
    images: [
      { url: getYouTubeThumbnailUrl(videoToWatch.key), alt: videoToWatch.name },
    ],
  });
}

export default async function MovieVideoPage({
  params: { movieId, videoId },
}: MovieVideoPageProps) {
  const { movie, videos, videoToWatch } = await getPageData({
    movieId,
    videoId,
  });

  return (
    <AppHeaderOffset>
      <Padder disableMobilePadding>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { md: '1fr 25rem', lg: '1fr 30rem' },
            alignItems: 'start',
          }}
        >
          <Card component="main" sx={responsiveBorderRadius()}>
            <YouTubePlayer youTubeId={videoToWatch.key} />
            <CardHeaderWithAvatar
              title={videoToWatch.name}
              subheader={movie.title}
              href={`/movies/${movie.id}`}
              imageSrc={movie.poster_path}
            />
          </Card>
          <Card component="aside" sx={responsiveBorderRadius()}>
            <CardHeader
              title="Videos"
              titleTypographyProps={{
                variant: 'h6',
                component: 'h2',
                fontWeight: 'bold',
              }}
            />
            <List
              sx={{
                overflow: 'auto',
                maxHeight: { lg: '75vh' },
              }}
              subheader={
                <ListSubheader>{videos.length} Video(s)</ListSubheader>
              }
            >
              {videos.map((video) => {
                return (
                  <ListItem key={video.id} disablePadding divider>
                    <ListItemLink
                      selected={video.id === videoToWatch.id}
                      href={`/movies/${movie.id}/videos/${video.id}`}
                    >
                      <ListItemAvatar sx={{ marginRight: 1 }}>
                        <BaseAvatar
                          src={getYouTubeThumbnailUrl(video.key)}
                          alt={video.name}
                          variant="rounded"
                          sx={{
                            width: '10rem',
                            height: 'auto',
                            aspectRatio: '16 / 9',
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={video.name}
                        primaryTypographyProps={{
                          sx: {
                            ...lineClamp(2),
                            typography: { xs: 'body2', md: 'body1' },
                            fontWeight: { xs: 'bold', md: 'bold' },
                          },
                        }}
                        secondary={video.type}
                        secondaryTypographyProps={{
                          typography: 'subtitle2',
                        }}
                      />
                    </ListItemLink>
                  </ListItem>
                );
              })}
            </List>
          </Card>
        </Box>
      </Padder>
    </AppHeaderOffset>
  );
}
