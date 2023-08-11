import { Maybe } from '@/common/common-types';
import { TmdbConfiguration, TmdbImageQuality } from './tmdb-types';

export function getTmdbImageUrl({
  tmdbConfiguration,
  imagePath,
  quality = 'w500',
}: {
  tmdbConfiguration: TmdbConfiguration;
  imagePath: Maybe<string>;
  quality?: TmdbImageQuality;
}) {
  if (!imagePath) {
    return '/placeholder.png';
  }

  return `${tmdbConfiguration.images.secure_base_url}${quality}${imagePath}`;
}
