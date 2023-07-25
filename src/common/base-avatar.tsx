import BaseImage from '@/common/base-image';
import { Avatar, AvatarProps } from '@mui/material';

export type BaseAvatarProps = AvatarProps;

export default function BaseAvatar({ src, alt, ...rest }: BaseAvatarProps) {
  return (
    <Avatar {...rest}>
      <BaseImage
        src={src ?? '/placeholder.png'}
        alt={alt ?? 'Unknown'}
        fill
        sx={{ objectFit: 'cover' }}
      />
    </Avatar>
  );
}
