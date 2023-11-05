import FixedBackgroundImage from '@/common/fixed-background-image';
import MovieSummary from '@/movies-profile/movie-summary';
import { getMovieDetails } from '@/movies/movie-fetchers';
import { Divider, Stack } from '@mui/material';
import type { Metadata } from 'next';
import MovieRecommendations from '@/movies-profile/movie-recommendations';
import MovieVideoCard from '@/movies/movie-video-card';
import MovieImageCard from '@/movies/movie-image-card';
import SingleRowGridList from '@/common/single-row-grid-list';
import MovieCastCard from '@/movies-profile/movie-person-card';
import SeeAllLink from '@/common/see-all-link';
import SectionTitle from '@/common/section-title';
import { notFound } from 'next/navigation';
import { getMetadata } from '@/seo/seo-utils';
import { getTmdbConfiguration } from '@/tmdb/tmdb-configuration-fetchers';
import { getTmdbImageUrl } from '@/tmdb/tmdb-configuration-utils';
import PageRoot from '@/layout/page-root';
import Padder from '@/common/padder';

async function getPageData(movieId: string) {
  const [movie, tmdbConfiguration] = await Promise.all([
    getMovieDetails(Number(movieId)),
    getTmdbConfiguration(),
  ]);

  if (!movie) {
    notFound();
  }

  return { movie, tmdbConfiguration };
}

// TODO: Tüm file name'leri kebab-case yap ve github'dan kontrol et tek kelimelikleri vs.

type MoviePageProps = {
  params: {
    movieId: string;
  };
};

export async function generateMetadata({
  params: { movieId },
}: MoviePageProps): Promise<Metadata> {
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

export default async function MoviePage({
  params: { movieId },
}: MoviePageProps) {
  const { movie } = await getPageData(movieId);

  const firstImage = movie.images?.backdrops[0];
  const firstVideo = movie.videos?.results[0];

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

        <section>
          <Padder>
            <SectionTitle title="Videos" />
            <SingleRowGridList
              itemCount={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 4 }}
            >
              {movie.videos?.results.slice(0, 4).map((video) => {
                return (
                  <li key={video.id}>
                    <MovieVideoCard movieId={movie.id} video={video} />
                  </li>
                );
              })}
            </SingleRowGridList>
          </Padder>
          <SeeAllLink
            href={`/movies/${movie.id}/videos/${firstVideo?.id}`}
            isLinkVisible={!!firstVideo}
          />
        </section>

        <section>
          <Padder>
            <SectionTitle title="Images" />
            <SingleRowGridList
              itemCount={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 4 }}
            >
              {movie.images?.backdrops.slice(0, 4).map((image, i) => {
                return (
                  <li key={image.file_path}>
                    <MovieImageCard
                      movieId={movie.id}
                      image={{
                        ...image,
                        alt: `"${movie.title}" Image - ${i + 1}`,
                      }}
                    />
                  </li>
                );
              })}
            </SingleRowGridList>
          </Padder>
          <SeeAllLink
            href={`/movies/${movie.id}/images${firstImage?.file_path}`}
            isLinkVisible={!!firstImage}
          />
        </section>

        <section>
          <Padder>
            {/* TODO: Bu, sayfayı x ekseninde overflow ediyor.
            http://localhost:3000/movies/569094 */}
            <SectionTitle title="Cast" />
            <SingleRowGridList
              itemCount={{ xs: 3, sm: 4, md: 5, lg: 6, xl: 6 }}
            >
              {movie.credits?.cast.slice(0, 7).map((movieCast) => {
                return (
                  <li key={movieCast.id}>
                    <MovieCastCard
                      personId={movieCast.id}
                      imageSrc={movieCast.profile_path}
                      title={movieCast.name}
                      subheader={movieCast.character}
                    />
                  </li>
                );
              })}
            </SingleRowGridList>
          </Padder>
          <SeeAllLink
            href={`/movies/${movie.id}/people`}
            isLinkVisible={!!movie.credits?.cast.length}
          />
        </section>

        <aside>
          <Padder>
            <SectionTitle title="Recommendations" />
            <MovieRecommendations movieId={movie.id} />
          </Padder>
        </aside>
      </Stack>
    </PageRoot>
  );
}
