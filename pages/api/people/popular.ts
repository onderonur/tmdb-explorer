import { createHandler } from '@/api/createHandler';
import { peopleService } from '@/people/PeopleService';
import { PaginationResponse } from '@/common/CommonTypes';
import { FIRST_PAGE } from '@/common/CommonUtils';
import { NextApiHandler } from 'next';
import { Person } from '@/people/PeopleTypes';

const handler: NextApiHandler<PaginationResponse<Person>> = async (
  req,
  res,
) => {
  const page = Number(req.query.page) || FIRST_PAGE;
  const people = await peopleService.getPopularPeople(page);
  res.status(200).json(people);
};

export default createHandler(handler);
