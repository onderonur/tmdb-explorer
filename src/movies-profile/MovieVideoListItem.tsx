import React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';
import NextLink from '@/routing/NextLink';
import useRouterPath from '@/routing/useRouterPath';
import { MovieVideo } from '@/media-gallery/MediaGalleryTypes';

interface MovieVideoListItemProps {
  video: MovieVideo;
}

function MovieVideoListItem({ video }: MovieVideoListItemProps) {
  const { asHref } = useRouterPath();
  return (
    <ListItemButton
      dense
      component={NextLink}
      href={`${asHref}?watch=${video.key}`}
      shallow
    >
      <ListItemText primary={video.name} secondary={video.type} />
    </ListItemButton>
  );
}

export default MovieVideoListItem;
