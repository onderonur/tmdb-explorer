import { getMovieDetails } from '@/movies/movie-fetchers';
import { notFound } from 'next/navigation';
import { getMetadata } from '@/seo/seo-utils';
import { getTmdbImageUrl } from '@/tmdb/tmdb-configuration-utils';
import { getTmdbConfiguration } from '@/tmdb/tmdb-configuration-fetchers';
import ImageGallery from '@/medias/image-gallery';

// TODO: Request sadeleştirilebilir belki filter'a da dikkat ederek.

async function getPageData({
  movieId,
  imagePath,
}: {
  movieId: string;
  imagePath: string;
}) {
  const [movie, tmdbConfiguration] = await Promise.all([
    getMovieDetails(Number(movieId)),
    getTmdbConfiguration(),
  ]);

  if (!movie) {
    notFound();
  }

  const images = movie.images?.backdrops ?? [];

  const imageToView = images.find(
    (backdrop) => backdrop.file_path === `/${imagePath}`,
  );

  if (!imageToView) {
    notFound();
  }

  return { movie, tmdbConfiguration, images, imageToView };
}

type MovieImagePageProps = {
  params: {
    movieId: string;
    imagePath: string;
  };
};

export async function generateMetadata({
  params: { movieId, imagePath },
}: MovieImagePageProps) {
  const { movie, tmdbConfiguration, imageToView } = await getPageData({
    movieId,
    imagePath,
  });

  return getMetadata({
    title: `Images of "${movie.title}"`,
    description: `Explore images of "${movie.title}"`,
    pathname: `/movies/${movieId}/images/${imagePath}`,
    // TODO: Fix
    images: [
      {
        url: getTmdbImageUrl({
          tmdbConfiguration,
          imagePath: imageToView.file_path,
        }),
        alt: `Image of "${movie.title}"`,
      },
    ],
  });
}

export default async function MovieImagePage({
  params: { movieId, imagePath },
}: MovieImagePageProps) {
  const { movie, images, imageToView } = await getPageData({
    movieId,
    imagePath,
  });

  return (
    <ImageGallery
      mediaCardHeaderProps={{
        title: `Images of "${movie.title}"`,
        subheader: movie.title,
        href: `/movies/${movie.id}`,
        imageSrc: movie.poster_path,
      }}
      imageToView={{ ...imageToView, alt: `Image of "${movie.title}"` }}
      images={images}
      imagePagePathTemplate={`/movies/${movie.id}/images/%imagePath%`}
      listItemProps={{
        aspectRatio: '16 / 9',
      }}
    />
  );
}
