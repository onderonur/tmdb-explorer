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

// TODO: Fix name
export const pagePaddingX = {
  paddingX: { xs: 2, sm: 3 },
};

export const pagePaddingY = {
  paddingY: { xs: 2, sm: 3 },
};
