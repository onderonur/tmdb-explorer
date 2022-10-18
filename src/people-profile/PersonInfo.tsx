import TextWithLabel from '@/common/TextWithLabel';
import { Person } from '@/people/PeopleTypes';
import { Box } from '@mui/material';

enum Genders {
  FEMALE = 1,
  MALE = 2,
}

interface PersonInfoProps {
  person: Person;
}

function PersonInfo({ person }: PersonInfoProps) {
  function getGender() {
    switch (person.gender) {
      case Genders.FEMALE:
        return 'Female';
      case Genders.MALE:
        return 'Male';
      default:
        return '';
    }
  }

  if (!person) {
    return null;
  }

  const gender = getGender();

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
      {gender && <TextWithLabel label="Gender" text={gender} />}
      {person.birthday && (
        <TextWithLabel label="Birthday" text={person.birthday} />
      )}
      {person.place_of_birth && (
        <TextWithLabel label="Place of Birth" text={person.place_of_birth} />
      )}
      {person.official_site && (
        <TextWithLabel label="Official Site" text={person.official_site} />
      )}
    </Box>
  );
}

export default PersonInfo;
