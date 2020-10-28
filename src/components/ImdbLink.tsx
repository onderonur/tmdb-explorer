import React from 'react';
import { makeStyles, Link } from '@material-ui/core';
import { Maybe } from '@/types';
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
  logo: {
    width: 70,
    display: 'block',
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
      href={getImdbProfileUrl(type, imdbId)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        className={classes.logo}
        src="/imdb-logo.svg"
        alt="IMDB Logo"
        unsized
      />
    </Link>
  );
}

export default ImdbLink;
