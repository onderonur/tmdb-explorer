import BaseImage from '@/common/base-image';
import { Avatar, AvatarProps } from '@mui/material';

export type BaseAvatarProps = AvatarProps & {
  alt: string;
};

export default function BaseAvatar({ src, alt, ...rest }: BaseAvatarProps) {
  return (
    <Avatar {...rest}>
      {src && (
        <BaseImage src={src} alt={alt} fill sx={{ objectFit: 'cover' }} />
      )}
    </Avatar>
  );
}
