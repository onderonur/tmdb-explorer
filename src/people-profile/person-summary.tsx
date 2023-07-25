import { Typography, Stack, Box, Card, CardMedia } from '@mui/material';
import { Person } from '@/people/PeopleTypes';
import PersonInfo from './PersonInfo';
import TmdbImage from '@/tmdb/tmdb-image';
import SectionTitle from '@/common/section-title';

type PersonSummaryProps = {
  person: Person;
};

function PersonSummary({ person }: PersonSummaryProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: 2,
        marginX: 'auto',
      }}
    >
      <Card sx={{ flexBasis: '18rem', marginX: 'auto' }}>
        <CardMedia
          sx={{ position: 'relative', width: '100%', aspectRatio: '2 / 3' }}
        >
          <TmdbImage
            src={person.profile_path}
            alt={person.name}
            fill
            sx={{ objectFit: 'cover' }}
            priority
          />
        </CardMedia>
      </Card>

      <Box sx={{ flex: 1, flexBasis: '28rem' }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
          {person.name}
        </Typography>
        <Stack spacing={2}>
          {person.biography && (
            <section>
              <SectionTitle title="Biography" />
              <Typography
                sx={{
                  whiteSpace: 'pre-wrap',
                }}
              >
                {person.biography}
              </Typography>
            </section>
          )}
          <section>
            <SectionTitle title="Personal Info" />
            <PersonInfo person={person} />
          </section>
        </Stack>
      </Box>
    </Box>
  );
}

export default PersonSummary;
