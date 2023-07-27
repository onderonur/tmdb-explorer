import { Card, CardHeader, CardMedia } from '@mui/material';
import TmdbAvatar from '@/tmdb/tmdb-avatar';
import CardLinkArea from '@/common/card-link-area';
import { Id } from '@/common/common-types';

type MoviePersonCardProps = {
  personId: Id;
  imageSrc: string;
  title: string;
  subheader: string;
};

export default function MoviePersonCard({
  personId,
  imageSrc,
  title,
  subheader,
}: MoviePersonCardProps) {
  return (
    <Card elevation={0} sx={{ bgcolor: 'transparent', textAlign: 'center' }}>
      <CardLinkArea href={`/people/${personId}`}>
        <CardMedia
          sx={{ padding: 1, display: 'flex', justifyContent: 'center' }}
        >
          <TmdbAvatar
            src={imageSrc}
            alt={title}
            sx={{ width: 82, height: 82 }}
          />
        </CardMedia>
        <CardHeader
          title={title}
          titleTypographyProps={{
            variant: 'subtitle1',
            fontWeight: 'medium',
          }}
          subheader={subheader}
          subheaderTypographyProps={{
            variant: 'subtitle2',
          }}
        />
      </CardLinkArea>
    </Card>
  );
}
