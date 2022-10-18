import { ID, PaginationResponse } from '@/common/CommonTypes';
import { FIRST_PAGE, getNextPageParam, IS_SERVER } from '@/common/CommonUtils';
import { Person, PersonDetails } from '@/people/PeopleTypes';
import { peopleService } from '@/people/PeopleService';
import { httpClient } from '@/http-client/httpClient';

export const peopleAPI = {
  personDetails: (personId: ID) => ({
    queryKey: ['personDetails', personId],
    queryFn: async () =>
      IS_SERVER
        ? peopleService.getPersonDetails(personId)
        : httpClient.get<PersonDetails>(`/api/person/${personId}`),
  }),
  popularPeople: () => ({
    queryKey: ['popularPeople'],
    queryFn: ({ pageParam = FIRST_PAGE }) =>
      IS_SERVER
        ? peopleService.getPopularPeople(pageParam)
        : httpClient.get<PaginationResponse<Person>>('/api/people/popular', {
            page: pageParam,
          }),
    getNextPageParam,
  }),
};
