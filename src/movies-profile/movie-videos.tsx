import type { Id } from '@/common/common-types';
import { createMockArray } from '@/common/common-utils';
import { Padder } from '@/common/padder';
import { SectionTitle } from '@/common/section-title';
import { SeeAllLink, SeeAllLinkSkeleton } from '@/common/see-all-link';
import { SingleRowGridList } from '@/common/single-row-grid-list';
import { getMovieVideos } from '../movies/movie-fetchers';
import { MovideVideoCard, MovieVideoCardSkeleton } from './movie-video-card';

// TODO: movie-videos, movie-images, movie-cast falan movie-profile'a konulabilir.

type MovieVideosShellProps = React.PropsWithChildren<{
  seeAllLink: React.ReactNode;
}>;

function MovieVideosShell({ seeAllLink, children }: MovieVideosShellProps) {
  return (
    <section>
      <Padder>
        <SectionTitle title="Videos" />
        <SingleRowGridList itemCount={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 4 }}>
          {children}
        </SingleRowGridList>
      </Padder>
      {seeAllLink}
    </section>
  );
}

type MovieVideosProps = {
  movieId: Id;
};

export async function MovieVideos({ movieId }: MovieVideosProps) {
  const videos = await getMovieVideos(movieId);
  const [firstVideo] = videos.results;

  return (
    <MovieVideosShell
      seeAllLink={
        <SeeAllLink
          href={`/movies/${movieId}/videos/${firstVideo.id}`}
          isLinkVisible={!!firstVideo}
        />
      }
    >
      {videos.results.slice(0, 4).map((video) => {
        return (
          <li key={video.id}>
            <MovideVideoCard movieId={movieId} video={video} />
          </li>
        );
      })}
    </MovieVideosShell>
  );
}

export function MovieVideosSkeleton() {
  return (
    <MovieVideosShell seeAllLink={<SeeAllLinkSkeleton />}>
      {createMockArray(4).map((key) => {
        return (
          <li key={key}>
            <MovieVideoCardSkeleton />
          </li>
        );
      })}
    </MovieVideosShell>
  );
}
