import PageTitle from '@/common/PageTitle';
import Padder from '@/common/padder';
import { getPopularPeople } from '@/people/people-fetchers';
import PeopleInfiniteGridList from '@/people/people-infinite-list';
import { Toolbar } from '@mui/material';

export default async function PopularPeoplePage() {
  const firstPage = await getPopularPeople(1);

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');

  // TODO: Bu container'ın bi anlamı var mı maxWidth olmadan bi bak. Başka page'lerde de var.
  return (
    <>
      <Toolbar />
      <Padder paddingX paddingY>
        <PageTitle title="Popular People" />
        <PeopleInfiniteGridList
          pageKeyTemplate={`/people/popular/api?${infiniteListSearchParams.toString()}`}
          firstPage={firstPage}
        />
      </Padder>
    </>
  );
}
