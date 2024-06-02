import { AppHeaderOffset } from '@/core/layouts/app-header';
import { FIRST_PAGE } from '@/core/shared/shared.utils';
import { Padder } from '@/core/ui/components/padder';
import { PageTitle } from '@/core/ui/components/page-title';
import { PeopleInfiniteGridList } from '@/features/people/components/people-infinite-list';
import { getPopularPeople } from '@/features/people/people.data';

export default async function PopularPeoplePage() {
  const firstPage = await getPopularPeople(FIRST_PAGE);

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <AppHeaderOffset>
      <main>
        <Padder>
          <PageTitle title="Popular People" />
          <PeopleInfiniteGridList
            pageKeyTemplate={`/api/people/popular?${infiniteListSearchParams.toString()}`}
            firstPage={firstPage}
          />
        </Padder>
      </main>
    </AppHeaderOffset>
  );
}
