import BaseGridList from '@/common/base-grid-list';
import { Id } from '@/common/common-types';
import MoviePersonCard from '@/movies-profile/movie-person-card';
import { getMovieDetails } from '@/movies/movie-fetchers';
import { MovieCrew } from '@/movies/movie-types';
import { Card, CardContent, Stack, Toolbar } from '@mui/material';
import { notFound } from 'next/navigation';
import Padder from '@/common/padder';
import MediaCardHeader from '@/medias/media-card-header';
import SectionTitle from '@/common/section-title';

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
    // TODO: Bu notFound app route'larda da kullanılabiliyor galiba bi bak.
    notFound();
  }

  const { credits } = movie;

  if (!credits) {
    notFound();
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
        <Stack spacing={2}>
          <Card>
            <MediaCardHeader
              title="Full Cast & Crew"
              subheader={movie.title}
              href={`/movies/${movie.id}`}
              imageSrc={movie.poster_path}
            />
          </Card>
          <section>
            <SectionTitle title="Cast" />
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
          </section>
          <section>
            <SectionTitle title="Crew" />
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
          </section>
        </Stack>
      </Padder>
    </>
  );
}
