import { BaseGridList } from '@/common/base-grid-list';
import type { Id } from '@/common/common-types';
import { Padder } from '@/common/padder';
import { SectionTitle } from '@/common/section-title';
import { PageRoot } from '@/layout/page-root';
import { MediaCardHeader } from '@/medias/media-card-header';
import { MoviePersonCard } from '@/movies-profile/movie-person-card';
import { getMovie, getMovieCredits } from '@/movies/movie-fetchers';
import type { MovieCrew } from '@/movies/movie-types';
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

  if (!movie) {
    notFound();
  }

  const crewById: Record<Id, MovieCrew[]> = {};

  for (const crew of credits.crew) {
    crewById[crew.id] = [...(crewById[crew.id] ?? []), crew];
  }

  // TODO: Ayrı olarak "aside" main'in içinde olabilir mi dışında mı olmalı bi bak.

  return (
    <PageRoot hasHeaderGutter>
      <Stack spacing={2}>
        <Padder disableMobilePadding>
          <Card>
            <MediaCardHeader
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
    </PageRoot>
  );
}
