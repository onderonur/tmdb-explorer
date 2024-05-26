import { ListItemLink } from '@/common/list-item-link';
import { Padder } from '@/common/padder';
import { PageRoot } from '@/layout/page-root';
import { TmdbImage } from '@/tmdb/tmdb-image';
import {
  Box,
  Card,
  CardHeader,
  List,
  ListItem,
  ListSubheader,
} from '@mui/material';
import { ImageGalleryNavigationLink } from './image-gallery-navigation-link';
import type { MediaCardHeaderProps } from './media-card-header';
import { MediaCardHeader } from './media-card-header';
import type { TImage } from './media-types';

type ImageGalleryProps = {
  // TODO: Change name
  mediaCardHeaderProps: MediaCardHeaderProps;
  imageToView: TImage & { alt: string };
  images: TImage[];
  imagePagePathTemplate: string;
  listItemProps: {
    aspectRatio: string;
  };
};

export function ImageGallery({
  mediaCardHeaderProps,
  imageToView,
  images,
  imagePagePathTemplate,
  listItemProps,
}: ImageGalleryProps) {
  const imageToViewIndex = images.findIndex(
    (image) => image.file_path === imageToView.file_path,
  );

  const previousImage = images[imageToViewIndex - 1];
  const nextImage = images[imageToViewIndex + 1];

  function getImagePagePath(imagePath: string) {
    return imagePagePathTemplate.replace(
      '%imagePath%',
      imagePath.replace('/', ''),
    );
  }

  return (
    <PageRoot hasHeaderGutter>
      <Padder disableMobilePadding>
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
                src={imageToView.file_path}
                alt={imageToView.alt}
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
                }}
              >
                {/* TODO: Fix */}
                {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
                {previousImage && (
                  <ImageGalleryNavigationLink
                    href={getImagePagePath(previousImage.file_path)}
                    direction="previous"
                  />
                )}
                <Box sx={{ flex: 1 }} />
                {/* TODO: Fix */}
                {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
                {nextImage && (
                  <ImageGalleryNavigationLink
                    href={getImagePagePath(nextImage.file_path)}
                    direction="next"
                  />
                )}
              </Box>
            </Box>
            <MediaCardHeader {...mediaCardHeaderProps} />
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
                  {images.length} Image(s)
                </ListSubheader>
              }
            >
              {images.map((image, i) => {
                return (
                  <ListItem key={image.file_path} disablePadding>
                    <ListItemLink
                      selected={image.file_path === imageToView.file_path}
                      href={getImagePagePath(image.file_path)}
                      sx={{
                        position: 'relative',
                        aspectRatio: listItemProps.aspectRatio,
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
                        alt={`Image no: ${i + 1}`}
                        fill
                        sx={{ objectFit: 'cover' }}
                      />
                    </ListItemLink>
                  </ListItem>
                );
              })}
            </List>
          </Card>
        </Box>
      </Padder>
    </PageRoot>
  );
}
