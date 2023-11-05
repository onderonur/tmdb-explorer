'use client';

import { useTmdbConfigurationContext } from '@/tmdb/tmdb-configuration-context';
import type { BaseImageProps } from '@/common/base-image';
import BaseImage from '@/common/base-image';
import type { Omit } from '@/common/common-types';
import type { TmdbImageQuality } from './tmdb-types';

type TmdbImageProps = Omit<BaseImageProps, 'src'> & {
  src: string;
  tmdbImageQuality?: TmdbImageQuality;
};

// TODO: Maybe `loader` might be better for this.s
// https://nextjs.org/docs/pages/api-reference/components/image#loader
export default function TmdbImage({
  src,
  tmdbImageQuality,
  ...rest
}: TmdbImageProps) {
  const { getImageUrl } = useTmdbConfigurationContext();

  const imageUrl = getImageUrl(src, tmdbImageQuality);

  return <BaseImage src={imageUrl} {...rest} />;
}
