import { createHandler } from '@/api/createHandler';
import { searchService } from '@/search/SearchService';
import { PaginationResponse } from '@/common/CommonTypes';
import { Movie } from '@/movies/MoviesTypes';
import { NextApiHandler } from 'next';
import { queryParser } from '@/api/queryParser';

const handler: NextApiHandler<PaginationResponse<Movie>> = async (req, res) => {
  const results = await searchService.searchMovies({
    page: queryParser.number(req.query.page),
    searchQuery: queryParser.string(req.query.searchQuery),
  });
  res.status(200).json(results);
};

export default createHandler(handler);
