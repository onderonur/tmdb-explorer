import PageTitle from '@/common/PageTitle';
import { Container } from '@mui/material';
import { getPopularPeople } from '@/people/people-fetchers';
import PeopleInfiniteGridList from '@/people/people-infinite-list';

export default async function PopularPeoplePage() {
  const firstPage = await getPopularPeople(1);

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');

  // TODO: Bu container'ın bi anlamı var mı maxWidth olmadan bi bak. Başka page'lerde de var.
  return (
    <Container maxWidth={false}>
      <PageTitle title="Popular People" />
      <PeopleInfiniteGridList
        pageKeyTemplate={`/people/popular/api?${infiniteListSearchParams.toString()}`}
        firstPage={firstPage}
      />
    </Container>
  );
}
