import TmdbAvatar from '@/tmdb/tmdb-avatar';
import NextLink from '@/routing/next-link';
import { CardHeader, Typography } from '@mui/material';

export type MediaCardHeaderProps = {
  title: string;
  subheader: string;
  href: string;
  imageSrc: string;
};

// TODO: Rename
export default function MediaCardHeader({
  title,
  subheader,
  href,
  imageSrc,
}: MediaCardHeaderProps) {
  return (
    <CardHeader
      avatar={
        <NextLink href={href}>
          <TmdbAvatar src={imageSrc} alt={title} />
        </NextLink>
      }
      title={
        <Typography variant="h6" component="h1">
          {title}
        </Typography>
      }
      subheader={<NextLink href={href}>{subheader}</NextLink>}
      disableTypography
    />
  );
}
