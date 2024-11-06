import { AppHeaderOffset } from '@/core/layouts/app-header';
import type { Id } from '@/core/shared/shared.types';
import { BaseGridList } from '@/core/ui/components/base-grid-list';
import { CardHeaderWithAvatar } from '@/core/ui/components/card-header-with-avatar';
import { Padder } from '@/core/ui/components/padder';
import { SectionTitle } from '@/core/ui/components/section-title';
import { MoviePersonCard } from '@/features/movies/components/movie-person-card';
import { getMovie, getMovieCredits } from '@/features/movies/movies.data';
import type { MovieCrew } from '@/features/movies/movies.types';
import { Card, CardContent, Stack } from '@mui/material';
import { notFound } from 'next/navigation';

type MoviePeoplePageProps = {
  params: {
    movieId: string;
  };
};

export default async function MoviePeoplePage({
  params: { movieId },
}: MoviePeoplePageProps) {
  const [movie, credits] = await Promise.all([
    getMovie(Number(movieId)),
    getMovieCredits(Number(movieId)),
  ]);

  if (!movie) notFound();

  const crewById: Record<Id, MovieCrew[]> = {};

  for (const crew of credits.crew) {
    crewById[crew.id] = [...(crewById[crew.id] ?? []), crew];
  }

  return (
    <AppHeaderOffset>
      <main>
        <Stack spacing={2}>
          <Padder disableMobilePadding>
            <Card>
              <CardHeaderWithAvatar
                title="Full Cast & Crew"
                subheader={movie.title}
                href={`/movies/${movie.id}`}
                imageSrc={movie.poster_path}
              />
            </Card>
          </Padder>
          <section>
            <Padder>
              <SectionTitle title="Cast" />
            </Padder>
            <Padder disableMobilePadding>
              <Card>
                <CardContent>
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
                </CardContent>
              </Card>
            </Padder>
          </section>
          <section>
            <Padder>
              <SectionTitle title="Crew" />
            </Padder>
            <Padder disableMobilePadding>
              <Card>
                <CardContent>
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
                </CardContent>
              </Card>
            </Padder>
          </section>
        </Stack>
      </main>
    </AppHeaderOffset>
  );
}
