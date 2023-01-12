import Image, { ImageProps } from 'next/image';
import { Omit } from './CommonTypes';

export const imageProps = {
  responsive: ({
    aspectRatio,
    objectFit,
  }: {
    aspectRatio: string;
    objectFit?: 'contain' | 'cover';
  }): Partial<ImageProps> => ({
    width: 0,
    height: 0,
    style: {
      width: '100%',
      height: 'auto',
      display: 'block',
      aspectRatio,
      objectFit: objectFit ?? 'cover',
    },
  }),
};

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
