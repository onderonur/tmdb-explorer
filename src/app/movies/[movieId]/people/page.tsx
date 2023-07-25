import BaseGridList from '@/common/BaseGridList';
import { ID } from '@/common/CommonTypes';
import MoviePersonCard from '@/movies-profile/movie-person-card';
import SectionTitle from '@/common/section-title';
import { getMovieDetails } from '@/movies/movie-fetchers';
import { MovieCrew } from '@/movies/movie-types';
import { Box, Divider } from '@mui/material';
import PageTitle from '@/common/PageTitle';
import PageRoot from '@/common/page-root';
import { notFound } from 'next/navigation';

type MoviePeoplePageProps = {
  params: {
    movieId: string;
  };
};

export default async function MoviePeoplePage({
  params: { movieId },
}: MoviePeoplePageProps) {
  const movie = await getMovieDetails(Number(movieId));

  if (!movie) {
    return notFound();
  }

  const { credits } = movie;

  if (!credits) {
    return notFound();
  }

  const crewById: Record<ID, MovieCrew[]> = {};

  for (const crew of credits.crew) {
    crewById[crew.id] = [...(crewById[crew.id] ?? []), crew];
  }

  // TODO: Ayrı olarak "aside" main'in içinde olabilir mi dışında mı olmalı bi bak.

  return (
    <PageRoot hasHeaderGutter>
      <PageTitle title="Full Cast & Crew" />
      <Box sx={{ display: 'grid', gap: 2 }}>
        {/* TODO: PageTitle ve SectionTitle'ın prop API'ını aynı yap */}
        <section>
          <SectionTitle title="Cast" />
          <BaseGridList>
            {credits.cast.map((castCredit) => {
              return (
                <li key={castCredit.id}>
                  <MoviePersonCard
                    personId={castCredit.id}
                    imageSrc={castCredit.profile_path}
                    title={castCredit.name}
                    subheader={castCredit.character}
                  />
                </li>
              );
            })}
          </BaseGridList>
        </section>
        <Divider />
        <section>
          <SectionTitle title="Crew" />
          <BaseGridList>
            {Object.values(crewById).map((crewCredits) => {
              const [first] = crewCredits;

              return (
                <li key={first.id}>
                  <MoviePersonCard
                    personId={first.id}
                    imageSrc={first.profile_path}
                    title={first.name}
                    subheader={crewCredits
                      .map((crewCredit) => crewCredit.job)
                      .join(', ')}
                  />
                </li>
              );
            })}
          </BaseGridList>
        </section>
      </Box>
    </PageRoot>
  );
}
