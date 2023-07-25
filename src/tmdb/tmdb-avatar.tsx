'use client';

import BaseAvatar, { BaseAvatarProps } from '@/common/base-avatar';
import { useTmdbConfigurationContext } from '@/tmdb/tmdb-configuration-context';

type TmdbAvatarProps = BaseAvatarProps;

export default function TmdbAvatar({ src, ...rest }: TmdbAvatarProps) {
  const { getImageUrl } = useTmdbConfigurationContext();

  const imageUrl = getImageUrl(src);

  return <BaseAvatar src={imageUrl} {...rest} />;
}
