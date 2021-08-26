import React from 'react';
import ListItemWithAvatar, {
  ListItemWithAvatarProps,
} from '@/common/ListItemWithAvatar';
import { BasePerson } from '@/common/CommonTypes';
import { ListItemProps } from '@material-ui/core';

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
    <ListItemWithAvatar
      avatarUrl={person.profile_path}
      primaryText={person.name}
      secondaryText={secondaryText}
      // TODO: Needs type fix
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(rest as any)}
    />
  );
}

export default PersonListItem;
