import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import NextLink from '@/routing/NextLink';
import useRouterPath from '@/routing/useRouterPath';
import { MovieVideo } from '@/movies/MoviesTypes';

interface MovieVideoCarouselItemProps {
  video: MovieVideo;
}

function MovieVideoCarouselItem({ video }: MovieVideoCarouselItemProps) {
  const { asHref } = useRouterPath();
  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        dense
        component={NextLink}
        href={`${asHref}?watch=${video.key}`}
        shallow
        sx={{
          border: 1,
          borderColor: (theme) => theme.palette.text.secondary,
          borderRadius: (theme) => Number(theme.shape.borderRadius) * 0.5,
        }}
      >
        <ListItemText
          primary={video.name}
          primaryTypographyProps={{
            sx: {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            },
          }}
          secondary={video.type}
        />
      </ListItemButton>
    </ListItem>
  );
}

export default MovieVideoCarouselItem;
