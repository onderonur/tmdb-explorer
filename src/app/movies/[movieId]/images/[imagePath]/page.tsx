// TODO: Metadata

import TmdbAvatar from '@/tmdb/tmdb-avatar';
import TmdbImage from '@/tmdb/tmdb-image';
import MediaCardHeader from '@/medias/media-card-header';
import { getMovieDetails } from '@/movies/movie-fetchers';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  Toolbar,
} from '@mui/material';
import { notFound } from 'next/navigation';
import ListItemLink from '@/common/list-item-link';

// TODO: Request sadeleştirilebilir belki filter'a da dikkat ederek.

type MovieImagePageProps = {
  params: {
    movieId: string;
    imagePath: string;
  };
};

export default async function MovieImagePage({
  params: { movieId, imagePath },
}: MovieImagePageProps) {
  const movie = await getMovieDetails(Number(movieId));

  if (!movie) {
    return notFound();
  }

  const pathWithSlash = `/${imagePath}`;

  const images = movie.images?.backdrops ?? [];

  const imageToView = images.find(
    (backdrop) => backdrop.file_path === pathWithSlash,
  );

  if (!imageToView) {
    return notFound();
  }

  return (
    <>
      <Toolbar />
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          // TODO: Diğer boyutlar için column'ları ayarla.
          gridTemplateColumns: { md: '1fr', lg: '1fr 12rem' },
          padding: 2,
          alignItems: 'start',
        }}
      >
        {/* TODO: Bu Card kullanımlarına bi bak valid mi vs. Belki komple de kaldırılabilir */}
        <Card
          sx={{
            alignSelf: 'start',
            bgcolor: 'transparent',
          }}
        >
          <CardContent
            sx={{
              padding: 0,
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              // TODO: Fix
              // bgcolor: 'background.paper',
            }}
          >
            <TmdbImage
              src={pathWithSlash}
              alt={`Image of ${movie.title}`}
              tmdbImageQuality="original"
              fill
              sx={{ objectFit: 'contain' }}
              priority
            />
          </CardContent>
          {/* TODO: Semantic yapı fix'lenebilir burada heading, link vs vs. */}
          <MediaCardHeader
            title={`Image of ${movie.title}`}
            movieId={Number(movieId)}
          />
        </Card>
        {/* TODO: Card yerine Paper vs de kullanılabilir vs vs. Tasarım da düzeltilebilir. */}
        <Card
          component="aside"
          sx={{
            bgcolor: 'transparent',
          }}
        >
          <CardHeader
            title="Images"
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
                // TODO: dvh kullanılabilir belki
                maxHeight: '76vh',
              }}
              subheader={<ListSubheader>{images.length} Images</ListSubheader>}
            >
              {images.map((image, i) => {
                return (
                  <ListItem key={image.file_path} disablePadding divider>
                    <ListItemLink
                      selected={image.file_path === imageToView.file_path}
                      href={`/movies/${movie.id}/images${image.file_path}`}
                    >
                      <ListItemAvatar sx={{ marginRight: 1 }}>
                        <TmdbAvatar
                          src={image.file_path}
                          alt={`${movie.title} Image - ${i}`}
                          variant="rounded"
                          sx={{
                            width: '10rem',
                            height: 'auto',
                            aspectRatio: '16 / 9',
                          }}
                        />
                      </ListItemAvatar>
                    </ListItemLink>
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
