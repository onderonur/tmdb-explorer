import TmdbImage from '@/tmdb/tmdb-image';
import MediaCardHeader from '@/medias/media-card-header';
import { getMovieDetails } from '@/movies/movie-fetchers';
import {
  Box,
  Card,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListSubheader,
  Toolbar,
} from '@mui/material';
import { notFound } from 'next/navigation';
import ListItemLink from '@/common/list-item-link';
import Padder from '@/common/padder';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { getMetadata } from '@/seo/seo-utils';
import { getTmdbImageUrl } from '@/tmdb/tmdb-configuration-utils';
import { getTmdbConfiguration } from '@/tmdb/tmdb-configuration-fetchers';

// TODO: Request sadeleştirilebilir belki filter'a da dikkat ederek.

async function getPageData({
  movieId,
  imagePath,
}: {
  movieId: string;
  imagePath: string;
}) {
  const [movie, tmdbConfiguration] = await Promise.all([
    getMovieDetails(Number(movieId)),
    getTmdbConfiguration(),
  ]);

  if (!movie) {
    notFound();
  }

  const images = movie.images?.backdrops ?? [];

  const imageToView = images.find(
    (backdrop) => backdrop.file_path === `/${imagePath}`,
  );

  if (!imageToView) {
    notFound();
  }

  return { movie, tmdbConfiguration, images, imageToView };
}

type MovieImagePageProps = {
  params: {
    movieId: string;
    imagePath: string;
  };
};

export async function generateMetadata({
  params: { movieId, imagePath },
}: MovieImagePageProps) {
  const { movie, tmdbConfiguration, imageToView } = await getPageData({
    movieId,
    imagePath,
  });

  return getMetadata({
    title: `Images of "${movie.title}"`,
    description: `Explore images of "${movie.title}"`,
    // TODO: Fix
    images: [
      {
        url: getTmdbImageUrl({
          tmdbConfiguration,
          imagePath: imageToView.file_path,
        }),
        alt: `Image of "${movie.title}"`,
      },
    ],
    pathname: `/movies/${movieId}/images/${imagePath}`,
  });
}

export default async function MovieImagePage({
  params: { movieId, imagePath },
}: MovieImagePageProps) {
  const { movie, images, imageToView } = await getPageData({
    movieId,
    imagePath,
  });

  return (
    <>
      <Toolbar />
      <Padder paddingY>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { md: '1fr', lg: '1fr 23rem' },
            alignItems: 'start',
          }}
        >
          <Card>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
              }}
            >
              <TmdbImage
                src={`/${imagePath}`}
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
            </Box>
            <MediaCardHeader
              title={`Images of "${movie.title}"`}
              subheader={movie.title}
              href={`/movies/${movie.id}`}
              imageSrc={movie.poster_path}
            />
          </Card>
          <Card component="aside">
            <CardHeader
              title="Images"
              titleTypographyProps={{
                variant: 'h6',
                component: 'h2',
                fontWeight: 'bold',
              }}
            />
            <List
              sx={{
                overflow: { lg: 'auto' },
                maxHeight: { lg: '75vh' },
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(11rem, 1fr))',
                gap: 0.5,
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
          </Card>
        </Box>
      </Padder>
    </>
  );
}
