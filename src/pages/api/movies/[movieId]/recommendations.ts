import { createHandler } from '@/api/createHandler';
import { PaginationResponse } from '@/common/CommonTypes';
import { FIRST_PAGE, validateId } from '@/common/CommonUtils';
import { moviesService } from '@/movies/MoviesService';
import { Movie } from '@/movies/MoviesTypes';
import { NextApiHandler } from 'next';

const handler: NextApiHandler<PaginationResponse<Movie>> = async (req, res) => {
  const movieId = validateId(req.query.movieId);
  const page = Number(req.query.page) || FIRST_PAGE;
  const movieRecommendations = await moviesService.getMovieRecommendations(
    movieId,
    {
      page,
    },
  );
  res.status(200).json(movieRecommendations);
};

export default createHandler(handler);
