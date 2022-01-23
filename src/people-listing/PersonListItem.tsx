import React from 'react';
import ListItemButtonWithAvatar, {
  ListItemWithAvatarProps,
} from '@/common/ListItemWithAvatar';
import { BasePerson } from '@/common/CommonTypes';
import { ListItemProps } from '@mui/material';

type PersonListItemProps<C extends React.ElementType> = ListItemProps<
  C,
  {
    component?: C;
    person: BasePerson;
    secondaryText?: ListItemWithAvatarProps<C>['secondaryText'];
  }
>;

function PersonListItem<C extends React.ElementType>({
  person,
  secondaryText,
  ...rest
}: PersonListItemProps<C>) {
  return (
    <ListItemButtonWithAvatar
      avatarUrl={person.profile_path}
      primaryText={person.name}
      secondaryText={secondaryText}
      // Required for MovieAndPersonAutocomplete
      {...rest}
    />
  );
}

export default PersonListItem;
