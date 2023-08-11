import { notFound } from 'next/navigation';
import { getMetadata } from '@/seo/seo-utils';
import { getTmdbImageUrl } from '@/tmdb/tmdb-configuration-utils';
import { getTmdbConfiguration } from '@/tmdb/tmdb-configuration-fetchers';
import { getPersonDetails } from '@/people/people-fetchers';
import ImageGallery from '@/medias/image-gallery';

async function getPageData({
  personId,
  imagePath,
}: {
  personId: string;
  imagePath: string;
}) {
  const [person, tmdbConfiguration] = await Promise.all([
    getPersonDetails(Number(personId)),
    getTmdbConfiguration(),
  ]);

  if (!person) {
    notFound();
  }

  const images = person.images?.profiles ?? [];

  const imageToView = images.find(
    (backdrop) => backdrop.file_path === `/${imagePath}`,
  );

  if (!imageToView) {
    notFound();
  }

  return { person, tmdbConfiguration, images, imageToView };
}

type PersonImagePageProps = {
  params: {
    personId: string;
    imagePath: string;
  };
};

export async function generateMetadata({
  params: { personId, imagePath },
}: PersonImagePageProps) {
  const { person, tmdbConfiguration, imageToView } = await getPageData({
    personId,
    imagePath,
  });

  return getMetadata({
    title: `Images of "${person.name}"`,
    description: `Explore images of "${person.name}"`,
    images: [
      {
        url: getTmdbImageUrl({
          tmdbConfiguration,
          imagePath: imageToView.file_path,
        }),
        alt: `Image of "${person.name}"`,
      },
    ],
    pathname: `/people/${personId}/images/${imagePath}`,
  });
}

export default async function PersonImagePage({
  params: { personId, imagePath },
}: PersonImagePageProps) {
  const { person, images, imageToView } = await getPageData({
    personId,
    imagePath,
  });

  return (
    <ImageGallery
      mediaCardHeaderProps={{
        title: `Images of "${person.name}"`,
        subheader: person.name,
        href: `/people/${person.id}`,
        imageSrc: person.profile_path,
      }}
      imageToView={{ ...imageToView, alt: `Image of "${person.name}"` }}
      images={images}
      listItemProps={{
        aspectRatio: '2 / 3',
        hrefTemplate: `/people/${person.id}/images/%imagePath%`,
      }}
    />
  );
}
