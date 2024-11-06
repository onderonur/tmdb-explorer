import { NextLink } from '@/core/routing/components/next-link';
import { lineClamp } from '@/core/theme/theme.utils';
import { TmdbAvatar } from '@/features/tmdb/components/tmdb-avatar';
import { CardHeader, Typography } from '@mui/material';

export type CardHeaderWithAvatarProps = {
  title: string;
  subheader: string;
  href: string;
  imageSrc: string;
};

export function CardHeaderWithAvatar({
  title,
  subheader,
  href,
  imageSrc,
}: CardHeaderWithAvatarProps) {
  return (
    <CardHeader
      avatar={
        <NextLink href={href}>
          <TmdbAvatar src={imageSrc} alt={title} />
        </NextLink>
      }
      title={
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '1rem', md: '1.25rem' },
            fontWeight: 'bold',
            ...lineClamp(2),
          }}
        >
          {title}
        </Typography>
      }
      subheader={
        <NextLink
          href={href}
          sx={{
            fontSize: { xs: '0.875rem', md: '1rem' },
            fontWeight: 'medium',
          }}
        >
          {subheader}
        </NextLink>
      }
      disableTypography
    />
  );
}
