import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import NextLink from '@/components/NextLink';
import useRouterPaths from '@/hooks/useRouterPaths';
import { MovieVideo } from '@/types';

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
