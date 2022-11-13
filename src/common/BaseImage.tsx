import Image, { ImageProps } from 'next/image';
import { Omit } from './CommonTypes';

type BaseImageProps = Omit<ImageProps, 'alt'> &
  Required<Pick<ImageProps, 'alt'>>;

function BaseImage({ src, alt, ...rest }: BaseImageProps) {
  return (
    <Image
      src={src ?? '/placeholder.png'}
      alt={alt}
      {...rest}
      // We set image as `unoptimized` to not exceed the
      // fair usage policy of vercel about image optimization.
      // https://vercel.com/docs/platform/fair-use-policy
      unoptimized
    />
  );
}

export default BaseImage;
