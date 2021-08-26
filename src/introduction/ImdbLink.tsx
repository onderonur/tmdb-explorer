import React from 'react';
import { Link, makeStyles } from '@material-ui/core';
import { Maybe } from '@/common/CommonTypes';
import Image from 'next/image';

export enum ImdbProfileType {
  MOVIE,
  PERSON,
}

export function getImdbProfileUrl(type: ImdbProfileType, imdbId: string) {
  return `https://www.imdb.com/${
    type === ImdbProfileType.MOVIE ? 'title' : 'name'
  }/${imdbId}`;
}

const useStyles = makeStyles(() => ({
  link: {
    display: 'flex',
  },
}));

interface ImdbLinkProps {
  type: ImdbProfileType;
  imdbId: Maybe<string>;
}

function ImdbLink({ type, imdbId }: ImdbLinkProps) {
  const classes = useStyles();

  if (!imdbId) {
    return null;
  }

  return (
    <Link
      className={classes.link}
      href={getImdbProfileUrl(type, imdbId)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        src="/imdb-logo.svg"
        alt="IMDB Logo"
        height={35}
        width={70}
        layout="fixed"
      />
    </Link>
  );
}

export default ImdbLink;
