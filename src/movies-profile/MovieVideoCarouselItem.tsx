import { ListItem, ListItemButton, ListItemText } from '@mui/material';
import NextLink from '@/routing/NextLink';
import { MovieVideo } from '@/movies/MoviesTypes';
import { useRouter } from 'next/router';

interface MovieVideoCarouselItemProps {
  video: MovieVideo;
}

function MovieVideoCarouselItem({ video }: MovieVideoCarouselItemProps) {
  const router = useRouter();

  return (
    <ListItem component="div" disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        dense
        component={NextLink}
        href={{ query: { ...router.query, watch: video.key } }}
        shallow
        sx={{
          border: 1,
          borderColor: (theme) => theme.palette.text.secondary,
          borderRadius: 2,
        }}
        scroll={false}
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
