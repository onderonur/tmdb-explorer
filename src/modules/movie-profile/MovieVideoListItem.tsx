import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import NextLink from '@/modules/shared/NextLink';
import useRouterPaths from '@/modules/shared/useRouterPaths';
import { MovieVideo } from '@/modules/shared/SharedTypes';

interface MovieVideoListItemProps {
  video: MovieVideo;
}

function MovieVideoListItem({ video }: MovieVideoListItemProps) {
  const { asHref } = useRouterPaths();
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
