// TODO: Metadata'ları düzelt

import YouTubePlayer from '@/medias/youtube-player';
import MediaCardHeader from '@/medias/media-card-header';
import { getMovieDetails } from '@/movies/movie-fetchers';
import { lineClamp } from '@/theme/theme-utils';
import {
  Box,
  Card,
  CardContent,
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

type MovieVideoPageProps = {
  params: {
    movieId: string;
    videoId: string;
  };
};

export default async function MovieVideoPage({
  params: { movieId, videoId },
}: MovieVideoPageProps) {
  const movie = await getMovieDetails(Number(movieId));

  if (!movie) {
    return notFound();
  }

  const videos = movie.videos?.results ?? [];

  const videoToWatch = videos.find((video) => video.id === videoId);

  if (!videoToWatch) {
    return notFound();
  }

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
          <Card sx={{ alignSelf: 'start', bgcolor: 'transparent' }}>
            <CardContent sx={{ padding: 0 }}>
              <YouTubePlayer youTubeId={videoToWatch.key} />
            </CardContent>
            {/* TODO: Semantic yapı fix'lenebilir burada heading, link vs vs. */}
            <MediaCardHeader
              title={videoToWatch.name}
              movieId={Number(movieId)}
            />
          </Card>
          <Card
            component="aside"
            sx={{
              bgcolor: 'transparent',
            }}
          >
            <CardHeader
              title="Videos"
              titleTypographyProps={{
                component: 'h2',
                variant: 'h6',
              }}
            />
            <CardContent
              sx={{
                padding: 0,
                height: '100%',
                overflow: 'hidden',
                // To make List scrollable.
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <List
                sx={{
                  overflow: 'auto',
                  maxHeight: { lg: '76vh' },
                }}
                // TODO: plural singular fix
                subheader={
                  <ListSubheader>{videos.length} Videos</ListSubheader>
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
            </CardContent>
          </Card>
        </Box>
      </Padder>
    </>
  );
}
