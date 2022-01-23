import React from 'react';
import Image, { ImageProps } from 'next/image';

type BaseImageProps = ImageProps;

function BaseImage({ src, alt, ...rest }: BaseImageProps) {
  return (
    <Image
      src={src ?? '/placeholder.png'}
      alt={alt}
      {...rest}
      // We set image as `unoptimized` to not exceed the
      // fair usage policy of vercel about image optimization.
      // https://vercel.com/docs/platform/fair-use-policy
      unoptimized={true}
    />
  );
}

export default BaseImage;
