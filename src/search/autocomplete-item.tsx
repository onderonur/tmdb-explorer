import {
  ListItemAvatar,
  ListItemText,
  ListItemProps,
  ListItemButton,
  ListItem,
} from '@mui/material';
import { Maybe } from '@/common/common-types';
import TmdbAvatar from '@/tmdb/tmdb-avatar';

type AutocompleteItemProps<C extends React.ElementType = 'li'> = ListItemProps<
  C,
  {
    component?: C;
    avatarUrl: string;
    primaryText: string;
    secondaryText?: Maybe<string>;
  }
>;

export default function AutocompleteItem<C extends React.ElementType>({
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
