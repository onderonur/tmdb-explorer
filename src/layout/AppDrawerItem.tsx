import {
  ListItemIcon,
  ListItemText,
  ListItemButton,
  ListItem,
} from '@mui/material';
import NextLink, { NextLinkProps } from '@/routing/NextLink';

type AppDrawerItemProps = Pick<NextLinkProps, 'href'> & {
  icon?: React.ReactNode;
  title: string;
  selected: boolean;
};

function AppDrawerItem({ href, icon, title, selected }: AppDrawerItemProps) {
  return (
    <ListItem disablePadding>
      <ListItemButton href={href} component={NextLink} selected={selected}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
}

export default AppDrawerItem;
