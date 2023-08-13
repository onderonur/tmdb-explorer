'use client';

import { useTmdbConfigurationContext } from '@/tmdb/tmdb-configuration-context';
import BaseImage, { BaseImageProps } from '@/common/base-image';
import { Omit } from '@/common/common-types';
import { TmdbImageQuality } from './tmdb-types';

type TmdbImageProps = Omit<BaseImageProps, 'src'> & {
  src: string;
  tmdbImageQuality?: TmdbImageQuality;
};

export default function TmdbImage({
  src,
  tmdbImageQuality,
  ...rest
}: TmdbImageProps) {
  const { getImageUrl } = useTmdbConfigurationContext();

  const imageUrl = getImageUrl(src, tmdbImageQuality);

  return <BaseImage src={imageUrl} {...rest} />;
}
