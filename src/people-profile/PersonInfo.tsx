import React from 'react';
import { Typography } from '@mui/material';
import TextWithLabel from '@/common/TextWithLabel';
import { Person } from '@/common/CommonTypes';

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
    <>
      {person.known_for_department && (
        <TextWithLabel label="Known For" text={person.known_for_department} />
      )}
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
      {!!person.also_known_as?.length && (
        <TextWithLabel
          label="Also Known As"
          text={person.also_known_as.map((alias) => (
            <Typography key={alias}>{alias}</Typography>
          ))}
        />
      )}
    </>
  );
}

export default PersonInfo;
