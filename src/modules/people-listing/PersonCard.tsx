import React from 'react';
import BaseImage from '@/modules/shared/BaseImage';
import BaseCard from '@/modules/shared/BaseCard';
import BaseCardHeader from '@/modules/shared/BaseCardHeader';
import { getAspectRatioString } from '../shared/AspectRatio';
import { useApiConfiguration } from '@/modules/api-configuration/ApiConfigurationContext';
import NextLink from '@/modules/routing/NextLink';
import { makeStyles } from '@material-ui/core';
import { Person } from '@/modules/shared/SharedTypes';

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
          aspectRatio={getAspectRatioString(2, 3)}
        />
        <BaseCardHeader title={person.name} />
      </BaseCard>
    </NextLink>
  );
}

export default PersonCard;
