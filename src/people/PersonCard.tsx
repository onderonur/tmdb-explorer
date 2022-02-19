import React from 'react';
import BaseImage from '@/common/BaseImage';
import BaseCard from '@/common/BaseCard';
import BaseCardHeader from '@/common/BaseCardHeader';
import NextLink from '@/routing/NextLink';
import { Person } from '@/people/PeopleTypes';
import useApiConfiguration from '@/api-configuration/useApiConfiguration';

interface PersonCardProps {
  person: Person;
}

function PersonCard({ person }: PersonCardProps) {
  const { getImageUrl } = useApiConfiguration();

  return (
    <NextLink href={`/person/${person.id}`}>
      <BaseCard hasActionArea>
        <BaseImage
          src={getImageUrl(person.profile_path)}
          alt={person.name}
          width={2}
          height={3}
          layout="responsive"
          objectFit="cover"
        />
        <BaseCardHeader title={person.name} />
      </BaseCard>
    </NextLink>
  );
}

export default PersonCard;
