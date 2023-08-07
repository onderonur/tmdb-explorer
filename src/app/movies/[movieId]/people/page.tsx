import BaseGridList from '@/common/BaseGridList';
import { Id } from '@/common/common-types';
import MoviePersonCard from '@/movies-profile/movie-person-card';
import SectionTitle from '@/common/section-title';
import { getMovieDetails } from '@/movies/movie-fetchers';
import { MovieCrew } from '@/movies/movie-types';
import { Divider, Stack, Toolbar } from '@mui/material';
import PageTitle from '@/common/PageTitle';
import { notFound } from 'next/navigation';
import Padder from '@/common/padder';

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

  const crewById: Record<Id, MovieCrew[]> = {};

  for (const crew of credits.crew) {
    crewById[crew.id] = [...(crewById[crew.id] ?? []), crew];
  }

  // TODO: Ayrı olarak "aside" main'in içinde olabilir mi dışında mı olmalı bi bak.

  return (
    <>
      <Toolbar />
      <Padder paddingY>
        {/* TODO: Bu title'a movie avatar ve link'ini ekle */}
        <PageTitle title="Full Cast & Crew" />
        <Stack spacing={2}>
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
        </Stack>
      </Padder>
    </>
  );
}
