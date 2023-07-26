// TODO: Bu component'in adı iyileştirilebilir.

import { getMovieGenres } from '@/movies/movie-fetchers';
import { List, ListSubheader } from '@mui/material';
import AppDrawerItem from './app-drawer-item';

export default async function AppDrawerGenres() {
  const genres = await getMovieGenres();

  return (
    <List subheader={<ListSubheader>Movie Genres</ListSubheader>}>
      {genres?.map((genre) => {
        const searchParams = new URLSearchParams();
        searchParams.set('genreId', genre.id.toString());

        return (
          <AppDrawerItem
            key={genre.id}
            href={`/movies/discover?${searchParams.toString()}`}
            title={genre.name}
            // TODO: Fix
            selected={false}
            // selected={
            //   pathname === '/movie/discover' &&
            //   Number(router.query.genreId) === genre.id
            // }
          />
        );
      })}
    </List>
  );
}
