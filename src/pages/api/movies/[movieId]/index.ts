import { createHandler } from '@/api/createHandler';
import { moviesService } from '@/movies/MoviesService';
import { MovieDetails } from '@/movies/MoviesTypes';
import { NextApiHandler } from 'next';
import { validateId } from '@/common/CommonUtils';

const handler: NextApiHandler<MovieDetails> = async (req, res) => {
  const movieId = validateId(req.query.movieId);
  const movieDetails = await moviesService.getMovieDetails(movieId);
  res.status(200).json(movieDetails);
};

export default createHandler(handler);
