import { SxProps } from '@mui/material';

// TODO: SxProps<Theme> için Theme typing nasıl olcak vs bi bak.

export function lineClamp(maxLines: number): SxProps {
  return {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: maxLines,
    overflow: 'hidden',
  };
}
