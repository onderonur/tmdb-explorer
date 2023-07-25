import FullSizeBackgroundImage from '@/common/full-size-background-image';
import MovieSummary from '@/movies-profile/movie-summary';
import { getMovieDetails } from '@/movies/movie-fetchers';
import { Stack } from '@mui/material';
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
import PageRoot from '@/common/page-root';

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
  const movie = await getMovieDetails(Number(movieId));

  if (!movie) {
    // TODO: Fix
    return {};
  }

  // TODO: Tamamla
  return getMetadata({
    title: movie.title,
    description: movie.overview,
    pathname: `/movies/${movieId}`,
  });
}

export default async function MoviePage({
  params: { movieId },
}: MoviePageProps) {
  const movie = await getMovieDetails(Number(movieId));

  if (!movie) {
    return notFound();
  }

  // TODO: Belki Container kullanılabilir.
  return (
    <PageRoot hero={<MovieSummary movie={movie} />}>
      <FullSizeBackgroundImage
        src={movie.backdrop_path}
        alt={movie.title}
        aspectRatio="16 / 9"
        hasScrollBasedOpacity
        hasDimmer
      />
      <Stack spacing={2}>
        <section>
          <SectionTitle title="Videos" />
          <SingleRowGridList itemCount={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}>
            {/* TODO: Çok zoom out yapınca vs noluyo bi bak. */}
            {movie.videos?.results.slice(0, 6).map((video) => {
              return (
                <li key={video.id}>
                  <MovieVideoCard movieId={movie.id} video={video} />
                </li>
              );
            })}
          </SingleRowGridList>
          <SeeAllLink
            // TODO: movies array'i için refactor (ilk item yoksa vs)
            href={`/movies/${movie.id}/videos/${movie.videos?.results[0]?.id}`}
            isLinkVisible={!!movie.videos?.results.length}
          />
        </section>

        <section>
          <SectionTitle title="Images" />
          <SingleRowGridList itemCount={{ xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}>
            {/* TODO: Çok zoom out yapınca vs noluyo bi bak. */}
            {movie.images?.backdrops.slice(0, 6).map((image) => {
              return (
                <li key={image.file_path}>
                  <MovieImageCard movieId={movie.id} image={image} />
                </li>
              );
            })}
          </SingleRowGridList>
          <SeeAllLink
            // TODO: movies array'i için refactor (ilk item yoksa vs)
            href={`/movies/${movie.id}/images${movie.images?.backdrops[0].file_path}`}
            isLinkVisible={!!movie.images?.backdrops.length}
          />
        </section>

        <section>
          <SectionTitle title="Cast" />
          <SingleRowGridList itemCount={{ xs: 3, sm: 4, md: 5, lg: 6, xl: 7 }}>
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
    </PageRoot>
  );
}
