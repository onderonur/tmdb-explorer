import type { Id } from '@/common/common-types';
import { FixedBackgroundImage } from '@/common/fixed-background-image';
import { Padder } from '@/common/padder';
import { PageRoot } from '@/layout/page-root';
import { MovieCast, MovieCastSkeleton } from '@/movies-profile/movie-cast';
import {
  MovieImages,
  MovieImagesSkeleton,
} from '@/movies-profile/movie-images';
import {
  MovieRecommendations,
  MovieRecommendationsSkeleton,
} from '@/movies-profile/movie-recommendations';
import { MovieSummary } from '@/movies-profile/movie-summary';
import {
  MovieVideos,
  MovieVideosSkeleton,
} from '@/movies-profile/movie-videos';
import { getMovie } from '@/movies/movie-fetchers';
import { getMetadata } from '@/seo/seo-utils';
import { getTmdbConfiguration } from '@/tmdb/tmdb-configuration-fetchers';
import { getTmdbImageUrl } from '@/tmdb/tmdb-configuration-utils';
import { Divider, Stack } from '@mui/material';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

async function getPageData(movieId: Id) {
  const [movie, tmdbConfiguration] = await Promise.all([
    getMovie(Number(movieId)),
    getTmdbConfiguration(),
  ]);

  if (!movie) {
    notFound();
  }

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
    <PageRoot>
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

        <Suspense fallback={<MovieRecommendationsSkeleton />}>
          <MovieRecommendations movieId={movie.id} />
        </Suspense>
      </Stack>
    </PageRoot>
  );
}
