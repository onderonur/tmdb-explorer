import { createHandler } from '@/api/createHandler';
import { searchService } from '@/search/SearchService';
import { PaginationResponse } from '@/common/CommonTypes';
import { Movie } from '@/movies/MoviesTypes';
import { Person } from '@/people/PeopleTypes';
import { NextApiHandler } from 'next';
import { queryParser } from '@/api/queryParser';

const handler: NextApiHandler<PaginationResponse<Movie | Person>> = async (
  req,
  res,
) => {
  const results = await searchService.searchMulti({
    page: queryParser.number(req.query.page),
    searchQuery: queryParser.string(req.query.searchQuery),
  });
  res.status(200).json(results);
};

export default createHandler(handler);
