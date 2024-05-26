'use client';

import type { BaseImageProps } from '@/common/base-image';
import { BaseImage } from '@/common/base-image';
import type { Omit } from '@/common/common-types';
import { useTmdbConfigurationContext } from '@/tmdb/tmdb-configuration-context';
import type { TmdbImageQuality } from './tmdb-types';

type TmdbImageProps = Omit<BaseImageProps, 'src'> & {
  src: string;
  tmdbImageQuality?: TmdbImageQuality;
};

export function TmdbImage({ src, tmdbImageQuality, ...rest }: TmdbImageProps) {
  const { getImageUrl } = useTmdbConfigurationContext();

  const imageUrl = getImageUrl(src, tmdbImageQuality);

  return <BaseImage src={imageUrl} {...rest} />;
}
