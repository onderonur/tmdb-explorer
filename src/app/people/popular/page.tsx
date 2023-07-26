import { FIRST_PAGE } from '@/common/CommonUtils';
import PageTitle from '@/common/PageTitle';
import Padder from '@/common/padder';
import { getPopularPeople } from '@/people/people-fetchers';
import PeopleInfiniteGridList from '@/people/people-infinite-list';
import { Toolbar } from '@mui/material';

export default async function PopularPeoplePage() {
  const firstPage = await getPopularPeople(FIRST_PAGE);

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <>
      <Toolbar />
      <Padder paddingY>
        <PageTitle title="Popular People" />
        <PeopleInfiniteGridList
          pageKeyTemplate={`/people/popular/api?${infiniteListSearchParams.toString()}`}
          firstPage={firstPage}
        />
      </Padder>
    </>
  );
}
