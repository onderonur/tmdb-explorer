import TmdbImage from '@/tmdb/tmdb-image';
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
import ListItemLink from '@/common/list-item-link';
import Padder from '@/common/padder';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MediaCardHeader, { MediaCardHeaderProps } from './media-card-header';
import { TImage } from './media-types';

type ImageGalleryProps = {
  // TODO: Change name
  mediaCardHeaderProps: MediaCardHeaderProps;
  imageToView: TImage & { alt: string };
  images: TImage[];
  listItemProps: {
    aspectRatio: string;
    hrefTemplate: string;
  };
};

export default function ImageGallery({
  mediaCardHeaderProps,
  imageToView,
  images,
  listItemProps,
}: ImageGalleryProps) {
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
                      href={listItemProps.hrefTemplate.replace(
                        '%imagePath%',
                        image.file_path,
                      )}
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
    </>
  );
}
