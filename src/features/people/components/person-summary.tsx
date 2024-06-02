import { SectionTitle } from '@/core/ui/components/section-title';
import { TextWithLabel } from '@/core/ui/components/text-with-label';
import type { PersonListItem } from '@/features/people/people.types';
import { Gender } from '@/features/people/people.utils';
import { TmdbImage } from '@/features/tmdb/components/tmdb-image';
import { Box, Card, CardMedia, Stack, Typography } from '@mui/material';

type PersonSummaryProps = {
  person: PersonListItem;
};

export function PersonSummary({ person }: PersonSummaryProps) {
  let genderText = '';

  switch (person.gender) {
    case Gender.FEMALE: {
      genderText = 'Female';
      break;
    }
    case Gender.MALE: {
      genderText = 'Male';
      break;
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 2,
      }}
    >
      <Card sx={{ flexBasis: '18rem' }}>
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

      <Box sx={{ flexBasis: '75ch' }}>
        <Stack spacing={1}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            {person.name}
          </Typography>
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
            <SectionTitle title="Person Info" />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              <TextWithLabel label="Gender" text={genderText} />
              <TextWithLabel label="Birthday" text={person.birthday} />
              <TextWithLabel
                label="Place of Birth"
                text={person.place_of_birth}
              />
              <TextWithLabel
                label="Official Site"
                text={person.official_site}
              />
            </Box>
          </section>
        </Stack>
      </Box>
    </Box>
  );
}
