import React from 'react';
import BaseImage from '@/common/BaseImage';
import BaseCard from '@/common/BaseCard';
import BaseCardHeader from '@/common/BaseCardHeader';
import { useApiConfiguration } from '@/api-configuration/ApiConfigurationContext';
import NextLink from '@/routing/NextLink';
import { Person } from '@/common/CommonTypes';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
}));

interface PersonCardProps {
  person: Person;
}

function PersonCard({ person }: PersonCardProps) {
  const classes = useStyles();
  const { getImageUrl } = useApiConfiguration();

  return (
    <NextLink className={classes.link} href={`/person/${person.id}`}>
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
