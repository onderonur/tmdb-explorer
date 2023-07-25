import BaseGridList from '@/common/BaseGridList';
import { ID } from '@/common/CommonTypes';
import MoviePersonCard from '@/movies-profile/movie-person-card';
import SectionTitle from '@/common/movie-details-section-title';
import { getMovieDetails } from '@/movies/movie-fetchers';
import { MovieCrew } from '@/movies/movie-types';
import { Box, Divider, Toolbar, Typography } from '@mui/material';

type MoviePeoplePageProps = {
  params: {
    movieId: string;
  };
};

export default async function MoviePeoplePage({
  params: { movieId },
}: MoviePeoplePageProps) {
  const movie = await getMovieDetails(Number(movieId));

  const { credits } = movie;

  if (!credits) {
    return null;
  }

  const crewById: Record<ID, MovieCrew[]> = {};

  for (const crew of credits.crew) {
    crewById[crew.id] = [...(crewById[crew.id] ?? []), crew];
  }

  // TODO: Ayrı olarak "aside" main'in içinde olabilir mi dışında mı olmalı bi bak.

  return (
    <>
      <Toolbar />
      <Box sx={{ padding: 2, display: 'grid', gap: 2 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          Full Cast & Crew
        </Typography>
        <section>
          <SectionTitle>Cast</SectionTitle>
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
          <SectionTitle>Crew</SectionTitle>
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
    </>
  );
}
