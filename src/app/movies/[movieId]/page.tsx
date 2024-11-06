import { AppHeaderOffset } from '@/core/layouts/app-header';
import { getMetadata } from '@/core/seo/seo.utils';
import type { Id } from '@/core/shared/shared.types';
import { FixedBackgroundImage } from '@/core/ui/components/fixed-background-image';
import { Padder } from '@/core/ui/components/padder';
import {
  MovieCast,
  MovieCastSkeleton,
} from '@/features/movies/components/movie-cast';
import {
  MovieImages,
  MovieImagesSkeleton,
} from '@/features/movies/components/movie-images';
import {
  MovieRecommendations,
  MovieRecommendationsSkeleton,
} from '@/features/movies/components/movie-recommendations';
import { MovieSummary } from '@/features/movies/components/movie-summary';
import {
  MovieTopCrew,
  MovieTopCrewSkeleton,
} from '@/features/movies/components/movie-top-crew';
import {
  MovieVideos,
  MovieVideosSkeleton,
} from '@/features/movies/components/movie-videos';
import { getMovie } from '@/features/movies/movies.data';
import { getTmdbConfiguration } from '@/features/tmdb/tmdb.data';
import { getTmdbImageUrl } from '@/features/tmdb/tmdb.utils';
import { Divider, Stack } from '@mui/material';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

async function getPageData(movieId: Id) {
  const [movie, tmdbConfiguration] = await Promise.all([
    getMovie(Number(movieId)),
    getTmdbConfiguration(),
  ]);

  if (!movie) notFound();

  return { movie, tmdbConfiguration };
}

type MoviePageProps = {
  params: {
    movieId: string;
  };
};

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  const movieId = Number(params.movieId);
  const { movie, tmdbConfiguration } = await getPageData(movieId);

  return getMetadata({
    title: movie.title,
    description: movie.overview,
    pathname: `/movies/${movieId}`,
    images: [
      {
        url: getTmdbImageUrl({
          tmdbConfiguration,
          imagePath: movie.poster_path,
        }),
        width: 500,
        height: 750,
        alt: movie.title,
      },
    ],
  });
}

export default async function MoviePage({ params }: MoviePageProps) {
  const movieId = Number(params.movieId);
  const { movie } = await getPageData(movieId);

  return (
    <AppHeaderOffset>
      <Stack spacing={2}>
        <main>
          <FixedBackgroundImage
            src={movie.backdrop_path}
            alt={movie.title}
            aspectRatio="16 / 9"
            hasScrollBasedOpacity
            hasDimmer
          />
          <Stack spacing={2}>
            <Padder>
              <MovieSummary movie={movie} />
            </Padder>

            <Padder>
              <Suspense fallback={<MovieTopCrewSkeleton />}>
                <MovieTopCrew movieId={movieId} />
              </Suspense>
            </Padder>

            <Divider />

            <Suspense fallback={<MovieVideosSkeleton />}>
              <MovieVideos movieId={movieId} />
            </Suspense>

            <Suspense fallback={<MovieImagesSkeleton />}>
              <MovieImages movieId={movieId} />
            </Suspense>

            <Suspense fallback={<MovieCastSkeleton />}>
              <MovieCast movieId={movieId} />
            </Suspense>
          </Stack>
        </main>
        <aside>
          <Suspense fallback={<MovieRecommendationsSkeleton />}>
            <MovieRecommendations movieId={movie.id} />
          </Suspense>
        </aside>
      </Stack>
    </AppHeaderOffset>
  );
}
