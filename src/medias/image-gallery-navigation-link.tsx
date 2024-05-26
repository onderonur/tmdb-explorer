import { NextLink } from '@/routing/next-link';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { Box } from '@mui/material';

type ImageGalleryNavigationLinkProps = {
  href: string;
  direction: 'previous' | 'next';
};

export function ImageGalleryNavigationLink({
  href,
  direction,
}: ImageGalleryNavigationLinkProps) {
  const iconsByDirection = {
    previous: ChevronLeftOutlinedIcon,
    next: ChevronRightOutlinedIcon,
  };

  const Icon = iconsByDirection[direction];

  const ariaLabelsByDirection = {
    previous: 'Previous image',
    next: 'Next image',
  };

  return (
    <NextLink
      href={href}
      aria-label={ariaLabelsByDirection[direction]}
      sx={{
        padding: 2,
        display: 'flex',
        alignItems: 'center',
        '& > .MuiBox-root': {
          transitionProperty: 'transform, opacity',
          transitionDuration: '100ms',
          transitionTimingFunction: 'ease-out',
        },
        '&:hover > :is(.MuiBox-root, .MuiSvgIcon-root)': {
          opacity: 0.8,
          transform: 'scale(1.15)',
        },
      }}
    >
      <Box
        sx={{
          bgcolor: 'primary.dark',
          opacity: 0.6,
          borderRadius: '50%',
          display: 'flex',
          padding: 1,
        }}
      >
        <Icon color="action" />
      </Box>
    </NextLink>
  );
}
