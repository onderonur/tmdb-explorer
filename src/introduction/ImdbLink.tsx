import React from 'react';
import { Box, Link } from '@mui/material';
import { Maybe } from '@/common/CommonTypes';
import Image from 'next/image';

export enum ImdbProfileType {
  MOVIE,
  PERSON,
}

function getImdbProfileUrl(type: ImdbProfileType, imdbId: string) {
  return `https://www.imdb.com/${
    type === ImdbProfileType.MOVIE ? 'title' : 'name'
  }/${imdbId}`;
}

interface ImdbLinkProps {
  type: ImdbProfileType;
  imdbId: Maybe<string>;
}

function ImdbLink({ type, imdbId }: ImdbLinkProps) {
  if (!imdbId) {
    return null;
  }

  return (
    <Box
      component={Link}
      display="flex"
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
    </Box>
  );
}

export default ImdbLink;
