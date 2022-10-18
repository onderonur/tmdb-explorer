import { createHandler } from '@/api/createHandler';
import { peopleService } from '@/people/PeopleService';
import { NextApiHandler } from 'next';
import { PersonDetails } from '@/people/PeopleTypes';
import { validateId } from '@/common/CommonUtils';

const handler: NextApiHandler<PersonDetails> = async (req, res) => {
  const personId = validateId(req.query.personId);
  const personDetails = await peopleService.getPersonDetails(personId);
  res.status(200).json(personDetails);
};

export default createHandler(handler);
