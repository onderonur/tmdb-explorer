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
import { getPersonImages } from '@/features/people/people.data';

type PersonImagesShellProps = {
  seeAllLink: React.ReactNode;
  children: React.ReactNode;
};

function PersonImagesShell({ seeAllLink, children }: PersonImagesShellProps) {
  return (
    <section>
      <Padder>
        <SectionTitle title="Images" />
        <SingleRowGridList itemCount={{ xs: 4, sm: 6, lg: 7, xl: 8 }}>
          {children}
        </SingleRowGridList>
      </Padder>
      {seeAllLink}
    </section>
  );
}

type PersonImagesProps = {
  personId: Id;
};

export async function PersonImages({ personId }: PersonImagesProps) {
  const images = await getPersonImages(personId);

  if (!images.length) return null;

  const [firstImage] = images;

  return (
    <PersonImagesShell
      seeAllLink={
        <SeeAllLink
          href={`/people/${personId}/images/${firstImage.file_path}`}
          isLinkVisible={!!firstImage}
        />
      }
    >
      {images.slice(0, 8).map((image, i) => {
        return (
          <li key={image.file_path}>
            <ImageCard
              href={`/people/${personId}/images${image.file_path}`}
              imageSrc={image.file_path}
              alt={`Image - ${i + 1}`}
              aspectRatio="2 / 3"
            />
          </li>
        );
      })}
    </PersonImagesShell>
  );
}

export function PersonImagesSkeleton() {
  return (
    <PersonImagesShell seeAllLink={<SeeAllLinkSkeleton />}>
      {createMockArray(8).map((key) => {
        return (
          <li key={key}>
            <ImageCardSkeleton aspectRatio="2 / 3" />
          </li>
        );
      })}
    </PersonImagesShell>
  );
}
