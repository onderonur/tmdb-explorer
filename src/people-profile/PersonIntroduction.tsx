import { Typography, Stack } from '@mui/material';
import Introduction from '@/introduction/Introduction';
import { Person } from '@/people/PeopleTypes';
import PersonInfo from './PersonInfo';

interface PersonIntroductionProps {
  person: Person;
}

function PersonIntroduction({ person }: PersonIntroductionProps) {
  return (
    <Introduction
      imageSrc={person.profile_path}
      imageAlt={person.name}
      title={person.name}
      content={
        <Stack spacing={2}>
          {person.biography && (
            <div>
              <Typography variant="h6" gutterBottom>
                Biography
              </Typography>
              <Typography
                sx={{
                  whiteSpace: 'pre-wrap',
                }}
              >
                {person.biography}
              </Typography>
            </div>
          )}
          <div>
            <Typography variant="h6" gutterBottom>
              Personal Info
            </Typography>
            <PersonInfo person={person} />
          </div>
        </Stack>
      }
    />
  );
}

export default PersonIntroduction;
