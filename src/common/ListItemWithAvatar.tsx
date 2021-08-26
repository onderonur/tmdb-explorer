import React from 'react';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemProps,
  makeStyles,
} from '@material-ui/core';
import { useApiConfiguration } from '@/api-configuration/ApiConfigurationContext';
import { Maybe } from '@/common/CommonTypes';

const useStyles = makeStyles(() => ({
  secondaryText: {
    wordBreak: 'break-word',
  },
}));

export type ListItemWithAvatarProps<C extends React.ElementType> =
  ListItemProps<
    C,
    {
      component?: C;
      avatarUrl: string;
      primaryText: React.ReactText;
      secondaryText?: Maybe<React.ReactText>;
    }
  >;

function ListItemWithAvatar<C extends React.ElementType>({
  avatarUrl,
  primaryText,
  secondaryText,
  ...rest
}: ListItemWithAvatarProps<C>) {
  const classes = useStyles();
  const { getImageUrl } = useApiConfiguration();

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
