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
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  Toolbar,
} from '@mui/material';
import { notFound } from 'next/navigation';
import ListItemLink from '@/common/list-item-link';
import Padder from '@/common/padder';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';

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
      <Padder paddingY>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            // TODO: Diğer boyutlar için column'ları ayarla.
            gridTemplateColumns: { md: '1fr', lg: '1fr 23rem' },
            alignItems: 'start',
          }}
        >
          <Card
            sx={{
              alignSelf: 'start',
            }}
          >
            <CardContent
              sx={{
                padding: 0,
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
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
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ padding: 1 }}>
                  {/* TODO: IconButtonLink yapılabilir bunlar */}
                  {/* TODO: Bunlar çalışmıyor */}
                  <IconButton aria-label="Previous image" size="large">
                    <ChevronLeftOutlinedIcon />
                  </IconButton>
                </Box>
                <Box sx={{ padding: 1 }}>
                  <IconButton aria-label="Next image" size="large">
                    <ChevronRightOutlinedIcon />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
            {/* TODO: Semantic yapı fix'lenebilir burada heading, link vs vs. */}
            <MediaCardHeader
              title={`Image of ${movie.title}`}
              movieId={Number(movieId)}
            />
          </Card>
          <Card component="aside">
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
                  overflow: { lg: 'auto' },
                  maxHeight: { lg: '76vh' },
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(11rem, 1fr))',
                  gap: 1,
                }}
                subheader={
                  <ListSubheader sx={{ gridColumn: '1 / -1' }}>
                    {images.length} Images
                  </ListSubheader>
                }
              >
                {images.map((image, i) => {
                  return (
                    <ListItem key={image.file_path} disablePadding>
                      <ListItemLink
                        selected={image.file_path === imageToView.file_path}
                        href={`/movies/${movie.id}/images${image.file_path}`}
                        sx={{
                          position: 'relative',
                          aspectRatio: '16 / 9',
                          borderRadius: 1,
                          overflow: 'hidden',
                          '&.Mui-selected': {
                            border: 4,
                            borderColor: 'primary.main',
                          },
                        }}
                      >
                        <TmdbImage
                          src={image.file_path}
                          alt={`${movie.title} Image - ${i}`}
                          fill
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
