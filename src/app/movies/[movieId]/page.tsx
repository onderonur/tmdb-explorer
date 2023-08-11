import FullSizeBackgroundImage from '@/common/full-size-background-image';
import MovieSummary from '@/movies-profile/movie-summary';
import { getMovieDetails } from '@/movies/movie-fetchers';
import { Divider, Stack } from '@mui/material';
import { Metadata } from 'next';
import MovieRecommendations from '@/movies-profile/movie-recommendations';
import MovieVideoCard from '@/movies/movie-video-card';
import MovieImageCard from '@/movies/movie-image-card';
import SingleRowGridList from '@/common/single-row-grid-list';
import MovieCastCard from '@/movies-profile/movie-person-card';
import SeeAllLink from '@/common/see-all-link';
import SectionTitle from '@/common/section-title';
import { notFound } from 'next/navigation';
import { getMetadata } from '@/seo/seo-utils';
import Padder from '@/common/padder';
import { getTmdbConfiguration } from '@/tmdb/tmdb-configuration-fetchers';
import { getTmdbImageUrl } from '@/tmdb/tmdb-configuration-utils';

async function getPageData(movieId: string) {
  const [movie, tmdbConfiguration] = await Promise.all([
    getMovieDetails(Number(movieId)),
    getTmdbConfiguration(),
  ]);

  if (!movie || !tmdbConfiguration) {
    notFound();
  }

  return { movie, tmdbConfiguration };
}

// TODO: Tüm file name'leri kebab-case yap ve github'dan kontrol et tek kelimelikleri vs.

// TODO: Gereksiz Fragment'ları sil.

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
    <>
      <FullSizeBackgroundImage
        src={movie.backdrop_path}
        alt={movie.title}
        aspectRatio="16 / 9"
        hasScrollBasedOpacity
        hasDimmer
      />
      <Padder>
        <Stack spacing={2}>
          <MovieSummary movie={movie} />

          <Divider />

          <section>
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
            <SeeAllLink
              href={`/movies/${movie.id}/videos/${firstVideo?.id}`}
              isLinkVisible={!!firstVideo}
            />
          </section>

          <section>
            <SectionTitle title="Images" />
            <SingleRowGridList
              itemCount={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 4 }}
            >
              {movie.images?.backdrops.slice(0, 4).map((image) => {
                return (
                  <li key={image.file_path}>
                    <MovieImageCard movieId={movie.id} image={image} />
                  </li>
                );
              })}
            </SingleRowGridList>
            <SeeAllLink
              href={`/movies/${movie.id}/images${firstImage?.file_path}`}
              isLinkVisible={!!firstImage}
            />
          </section>

          <section>
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
            <SeeAllLink
              href={`/movies/${movie.id}/people`}
              isLinkVisible={!!movie.credits?.cast.length}
            />
          </section>

          <aside>
            <SectionTitle title="Recommendations" />
            <MovieRecommendations movieId={movie.id} />
          </aside>
        </Stack>
      </Padder>
    </>
  );
}
