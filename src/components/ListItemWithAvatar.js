import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { useConfiguration } from '@/contexts/ConfigurationContext';

const useStyles = makeStyles((theme) => ({
  secondaryText: {
    wordBreak: 'break-word',
  },
}));

function ListItemWithAvatar({
  avatarUrl,
  primaryText,
  secondaryText,
  ...rest
}) {
  const classes = useStyles();
  const { getImageUrl } = useConfiguration();

  return (
    <ListItem alignItems="flex-start" dense {...rest}>
      <ListItemAvatar>
        <Avatar src={getImageUrl(avatarUrl)} alt={'Avatar'} />
      </ListItemAvatar>
      <ListItemText
        classes={{
          secondary: classes.secondaryText,
        }}
        primary={primaryText}
        secondary={secondaryText}
      />
    </ListItem>
  );
}

export default ListItemWithAvatar;
