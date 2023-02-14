import { createHandler } from '@/api/createHandler';
import { moviesService } from '@/movies/MoviesService';
import { PaginationResponse } from '@/common/CommonTypes';
import { FIRST_PAGE } from '@/common/CommonUtils';
import { Movie } from '@/movies/MoviesTypes';
import { NextApiHandler } from 'next';
import { queryParser } from '@/api/queryParser';

const handler: NextApiHandler<PaginationResponse<Movie>> = async (req, res) => {
  const page = Number(req.query.page) || FIRST_PAGE;
  const movies = await moviesService.getDiscoverMovies(page, {
    genreId: queryParser.number(req.query.genreId),
    sortBy: queryParser.string(req.query.sortBy),
  });
  res.status(200).json(movies);
};

export default createHandler(handler);
