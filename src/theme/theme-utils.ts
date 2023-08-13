import { SxProps, Theme } from '@mui/material';

export function lineClamp(maxLines: number): SxProps<Theme> {
  return {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: maxLines,
    overflow: 'hidden',
  };
}
