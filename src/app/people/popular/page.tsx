import PageTitle from '@/common/PageTitle';
import { getPopularPeople } from '@/people/people-fetchers';
import PeopleInfiniteGridList from '@/people/people-infinite-list';
import PageRoot from '@/common/page-root';

export default async function PopularPeoplePage() {
  const firstPage = await getPopularPeople(1);

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');

  // TODO: Bu container'ın bi anlamı var mı maxWidth olmadan bi bak. Başka page'lerde de var.
  return (
    <PageRoot hasHeaderGutter>
      <PageTitle title="Popular People" />
      <PeopleInfiniteGridList
        pageKeyTemplate={`/people/popular/api?${infiniteListSearchParams.toString()}`}
        firstPage={firstPage}
      />
    </PageRoot>
  );
}
