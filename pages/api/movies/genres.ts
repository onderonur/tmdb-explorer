import { createHandler } from '@/api/createHandler';
import { moviesService } from '@/movies/MoviesService';
import { Genre } from '@/movies/MoviesTypes';
import { NextApiHandler } from 'next';

const handler: NextApiHandler<Genre[]> = async (req, res) => {
  const genres = await moviesService.getMovieGenres();
  res.status(200).json(genres);
};

export default createHandler(handler);
