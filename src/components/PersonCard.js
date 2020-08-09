import React from 'react';
import BaseImage from '@/components/BaseImage';
import BaseCard from '@/components/BaseCard';
import { makeStyles } from '@material-ui/styles';
import BaseCardHeader from '@/components/BaseCardHeader';
import { getAspectRatioString } from './AspectRatio';
import { useConfiguration } from '@/contexts/ConfigurationContext';
import NextLink from './NextLink';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
}));

function PersonCard({ person }) {
  const classes = useStyles();
  const { getImageUrl } = useConfiguration();

  return (
    <NextLink
      className={classes.link}
      href="/person/[personId]"
      as={`/person/${person.id}`}
    >
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
