import PageTitle from '@/common/PageTitle';
import { getPopularPeople } from '@/people/people-fetchers';
import PeopleInfiniteGridList from '@/people/people-infinite-list';
import { pagePaddingX, pagePaddingY } from '@/theme/theme-utils';
import { Box, Toolbar } from '@mui/material';

export default async function PopularPeoplePage() {
  const firstPage = await getPopularPeople(1);

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');

  // TODO: Bu container'ın bi anlamı var mı maxWidth olmadan bi bak. Başka page'lerde de var.
  return (
    <>
      <Toolbar />
      <Box sx={{ ...pagePaddingX, ...pagePaddingY }}>
        <PageTitle title="Popular People" />
        <PeopleInfiniteGridList
          pageKeyTemplate={`/people/popular/api?${infiniteListSearchParams.toString()}`}
          firstPage={firstPage}
        />
      </Box>
    </>
  );
}
