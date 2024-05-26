import { ListItemLink } from '@/common/list-item-link';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

type AppDrawerItemProps = {
  icon?: React.ReactNode;
  title: string;
  selected: boolean;
  href: string;
};

export function AppDrawerItem({
  href,
  icon,
  title,
  selected,
}: AppDrawerItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemLink href={href} selected={selected}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={title} />
      </ListItemLink>
    </ListItem>
  );
}
