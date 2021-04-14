import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import NextLink from '@/modules/routing/NextLink';
import useRouterPath from '@/modules/routing/useRouterPath';
import { MovieVideo } from '@/modules/media-gallery/MediaGalleryTypes';

interface MovieVideoListItemProps {
  video: MovieVideo;
}

function MovieVideoListItem({ video }: MovieVideoListItemProps) {
  const { asHref } = useRouterPath();
  return (
    <ListItem
      button
      dense
      component={NextLink}
      href={`${asHref}?watch=${video.key}`}
      shallow
    >
      <ListItemText primary={video.name} secondary={video.type} />
    </ListItem>
  );
}

export default MovieVideoListItem;
