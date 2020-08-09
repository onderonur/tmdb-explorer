import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import NextLink from '@components/NextLink';
import useRouterPaths from '@hooks/useRouterPaths';

function MovieVideoListItem({ video }) {
  const { href, asHref } = useRouterPaths();
  return (
    <ListItem
      button
      dense
      component={NextLink}
      href={`${href}?watch=${video.key}`}
      as={`${asHref}?watch=${video.key}`}
      shallow
    >
      <ListItemText primary={video.name} secondary={video.type} />
    </ListItem>
  );
}

export default MovieVideoListItem;
