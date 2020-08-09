import React from 'react';
import { Typography } from '@material-ui/core';
import TextWithLabel from '@/components/TextWithLabel';

function PersonInfo({ person }) {
  function getGender() {
    return person.gender === 1 ? 'Female' : person.gender === 2 ? 'Male' : '';
  }

  if (!person) {
    return null;
  }

  return (
    <>
      <TextWithLabel label="Known For" text={person.known_for_department} />
      <TextWithLabel label="Gender" text={getGender(person.gender)} />
      <TextWithLabel label="Birthday" text={person.birthday} />
      <TextWithLabel label="Place of Birth" text={person.place_of_birth} />
      {person.official_site && (
        <TextWithLabel label="Official Site" text={person.official_site} />
      )}
      {person.also_known_as?.length ? (
        <TextWithLabel
          label="Also Known As"
          text={person.also_known_as.map((alias) => (
            <Typography key={alias}>{alias}</Typography>
          ))}
        />
      ) : null}
    </>
  );
}

export default PersonInfo;
