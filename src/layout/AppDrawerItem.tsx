import { ListItemIcon, ListItemText, ListItem } from '@mui/material';
import ListItemLink from '@/common/list-item-link';

type AppDrawerItemProps = {
  icon?: React.ReactNode;
  title: string;
  selected: boolean;
  href: string;
};

function AppDrawerItem({ href, icon, title, selected }: AppDrawerItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemLink href={href} selected={selected}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={title} />
      </ListItemLink>
    </ListItem>
  );
}

export default AppDrawerItem;
