import React from 'react';
import ListItemWithAvatar from '@/components/ListItemWithAvatar';

function PersonListItem({ person, secondaryText, ...props }) {
  return (
    <ListItemWithAvatar
      avatarUrl={person.profile_path}
      primaryText={person.name}
      secondaryText={secondaryText}
      {...props}
    />
  );
}

export default PersonListItem;
