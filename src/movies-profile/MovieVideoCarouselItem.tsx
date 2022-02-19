import React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';
import NextLink from '@/routing/NextLink';
import useRouterPath from '@/routing/useRouterPath';
import { MovieVideo } from '@/media-gallery/MediaGalleryTypes';

interface MovieVideoCarouselItemProps {
  video: MovieVideo;
}

function MovieVideoCarouselItem({ video }: MovieVideoCarouselItemProps) {
  const { asHref } = useRouterPath();
  return (
    <ListItemButton
      dense
      component={NextLink}
      href={`${asHref}?watch=${video.key}`}
      shallow
      sx={{
        border: 1,
        borderColor: (theme) => theme.palette.text.secondary,
        borderRadius: (theme) => Number(theme.shape.borderRadius) * 0.5,
      }}
    >
      <ListItemText
        primary={video.name}
        primaryTypographyProps={{
          sx: {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
        }}
        secondary={video.type}
      />
    </ListItemButton>
  );
}

export default MovieVideoCarouselItem;
