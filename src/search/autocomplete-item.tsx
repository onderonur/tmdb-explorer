import type { Maybe } from '@/common/common-types';
import { TmdbAvatar } from '@/tmdb/tmdb-avatar';
import type { ListItemProps } from '@mui/material';
import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';

type AutocompleteItemProps<C extends React.ElementType = 'li'> = ListItemProps<
  C,
  {
    component?: C;
    avatarUrl: string;
    primaryText: string;
    secondaryText?: Maybe<string>;
  }
>;

export function AutocompleteItem<C extends React.ElementType>({
  avatarUrl,
  primaryText,
  secondaryText,
  ...rest
}: AutocompleteItemProps<C>) {
  return (
    <ListItem disablePadding>
      <ListItemButton dense sx={{ alignItems: 'flex-start' }} {...rest}>
        <ListItemAvatar>
          <TmdbAvatar src={avatarUrl} alt={'Avatar'} />
        </ListItemAvatar>
        <ListItemText primary={primaryText} secondary={secondaryText} />
      </ListItemButton>
    </ListItem>
  );
}
