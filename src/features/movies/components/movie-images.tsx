import type { Id } from '@/core/shared/shared.types';
import { createMockArray } from '@/core/shared/shared.utils';
import { Padder } from '@/core/ui/components/padder';
import { SectionTitle } from '@/core/ui/components/section-title';
import {
  SeeAllLink,
  SeeAllLinkSkeleton,
} from '@/core/ui/components/see-all-link';
import { SingleRowGridList } from '@/core/ui/components/single-row-grid-list';
import {
  ImageCard,
  ImageCardSkeleton,
} from '@/features/media/components/image-card';
import { getMovieImages } from '@/features/movies/movies.data';

type MovieImagesShellProps = {
  seeAllLink: React.ReactNode;
  children: React.ReactNode;
};

function MovieImagesShell({ seeAllLink, children }: MovieImagesShellProps) {
  return (
    <section>
      <Padder>
        <SectionTitle title="Images" />
        <SingleRowGridList itemCount={{ xs: 2, sm: 2, md: 3, lg: 4, xl: 4 }}>
          {children}
        </SingleRowGridList>
      </Padder>
      {seeAllLink}
    </section>
  );
}

type MovieImagesProps = {
  movieId: Id;
};

export async function MovieImages({ movieId }: MovieImagesProps) {
  const images = await getMovieImages(movieId);

  if (!images.length) return null;

  const [firstImage] = images;

  return (
    <MovieImagesShell
      seeAllLink={
        <SeeAllLink
          href={`/movies/${movieId}/images/${firstImage.file_path}`}
          isLinkVisible={!!firstImage}
        />
      }
    >
      {images.slice(0, 4).map((image, i) => {
        return (
          <li key={image.file_path}>
            <ImageCard
              href={`/movies/${movieId}/images${image.file_path}`}
              imageSrc={image.file_path}
              alt={`Image - ${i + 1}`}
              aspectRatio="16 / 9"
            />
          </li>
        );
      })}
    </MovieImagesShell>
  );
}

export function MovieImagesSkeleton() {
  return (
    <MovieImagesShell seeAllLink={<SeeAllLinkSkeleton />}>
      {createMockArray(4).map((key) => {
        return (
          <li key={key}>
            <ImageCardSkeleton aspectRatio="16 / 9" />
          </li>
        );
      })}
    </MovieImagesShell>
  );
}
