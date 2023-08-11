// TODO: Metadata'ları düzelt

import YouTubePlayer from '@/medias/youtube-player';
import MediaCardHeader from '@/medias/media-card-header';
import { getMovieDetails } from '@/movies/movie-fetchers';
import { lineClamp } from '@/theme/theme-utils';
import {
  Box,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Toolbar,
} from '@mui/material';
import { notFound } from 'next/navigation';
import BaseAvatar from '@/common/base-avatar';
import ListItemLink from '@/common/list-item-link';
import Padder from '@/common/padder';
import { getYouTubeThumbnailUrl } from '@/medias/media-utils';
import { getMetadata } from '@/seo/seo-utils';

async function getPageData({
  movieId,
  videoId,
}: {
  movieId: string;
  videoId: string;
}) {
  const movie = await getMovieDetails(Number(movieId));

  if (!movie) {
    notFound();
  }

  const videos = movie.videos?.results ?? [];

  const videoToWatch = videos.find((video) => video.id === videoId);

  if (!videoToWatch) {
    notFound();
  }

  return { movie, videos: movie.videos?.results ?? [], videoToWatch };
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
    title: videoToWatch.name,
    description: `Watch "${videoToWatch.name}" video of "${movie.title}"`,
    images: [
      { url: getYouTubeThumbnailUrl(videoToWatch.key), alt: videoToWatch.name },
    ],
    pathname: `/movies/${movieId}/videos/${videoId}`,
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
    <>
      <Toolbar />
      <Padder paddingY>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { md: '1fr 25rem', lg: '1fr 30rem' },
            alignItems: 'start',
          }}
        >
          <Card>
            <YouTubePlayer youTubeId={videoToWatch.key} />
            <MediaCardHeader
              title={videoToWatch.name}
              subheader={movie.title}
              href={`/movies/${movie.id}`}
              imageSrc={movie.poster_path}
            />
          </Card>
          <Card component="aside">
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
                          sx: lineClamp(2),
                          fontWeight: 'medium',
                        }}
                        secondary={video.type}
                      />
                    </ListItemLink>
                  </ListItem>
                );
              })}
            </List>
          </Card>
        </Box>
      </Padder>
    </>
  );
}
