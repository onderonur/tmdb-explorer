import { FIRST_PAGE } from '@/common/common-constants';
import { Padder } from '@/common/padder';
import { PageTitle } from '@/common/page-title';
import { PageRoot } from '@/layout/page-root';
import { getPopularPeople } from '@/people/people-fetchers';
import { PeopleInfiniteGridList } from '@/people/people-infinite-list';

export default async function PopularPeoplePage() {
  const firstPage = await getPopularPeople(FIRST_PAGE);

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <PageRoot hasHeaderGutter>
      <Padder>
        <PageTitle title="Popular People" />
        <PeopleInfiniteGridList
          pageKeyTemplate={`/people/popular/api?${infiniteListSearchParams.toString()}`}
          firstPage={firstPage}
        />
      </Padder>
    </PageRoot>
  );
}
