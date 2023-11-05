import type { SxProps, Theme } from '@mui/material';
import { Box } from '@mui/material';
import type { ImageProps } from 'next/image';
import Image from 'next/image';

// TODO: sx prop'un vs theme typing'ini ayarlamanın yolu var mı bak.

export type BaseImageProps = ImageProps & {
  sx?: SxProps<Theme>;
};

export default function BaseImage({ src, alt, ...rest }: BaseImageProps) {
  return (
    <Box
      component={Image}
      src={src || '/placeholder.png'}
      alt={alt}
      {...rest}
      // We set image as `unoptimized` to not exceed the
      // fair usage policy of vercel about image optimization.
      // https://vercel.com/docs/platform/fair-use-policy
      unoptimized
    />
  );
}
