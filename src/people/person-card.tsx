import { PersonListItem } from '@/people/people-types';
import { Box, Card, CardHeader } from '@mui/material';
import TmdbImage from '@/tmdb/tmdb-image';
import CardLinkArea from '@/common/card-link-area';

type PersonCardProps = {
  person: PersonListItem;
};

function PersonCard({ person }: PersonCardProps) {
  return (
    <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
      <CardLinkArea href={`/people/${person.id}`}>
        <Box sx={{ position: 'relative', aspectRatio: '2 / 3' }}>
          <TmdbImage
            src={person.profile_path}
            alt={person.name}
            fill
            sx={{ objectFit: 'cover' }}
          />
        </Box>
        <CardHeader
          title={person.name}
          titleTypographyProps={{ variant: 'subtitle2', fontWeight: 'bold' }}
          sx={{ padding: 1 }}
        />
      </CardLinkArea>
    </Card>
  );
}

export default PersonCard;
