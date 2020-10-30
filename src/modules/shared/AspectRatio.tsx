import React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Maybe } from '@/modules/shared/SharedTypes';

export const getAspectRatioString = (width: number, height: number) =>
  `${width}:${height}`;

interface AspectRatioStyleProps {
  paddingTop: Maybe<number | string>;
}

const useStyles = makeStyles<Theme, AspectRatioStyleProps>((theme) => ({
  root: {
    overflow: 'hidden',
    position: 'relative',
    height: ({ paddingTop }) => (paddingTop ? 0 : undefined),
    paddingTop: ({ paddingTop }) => paddingTop || undefined,
    '& > *': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  },
}));

type AspectRatioProps = React.PropsWithChildren<{
  aspectRatio: string;
}>;

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio({ aspectRatio, children }, ref) {
    const [ratioX, ratioY] = aspectRatio
      .split(':')
      .map((ratio) => parseInt(ratio));
    const ratio = (100 * ratioY) / ratioX;
    const paddingTop = isNaN(ratio) ? undefined : `${ratio}%`;

    const classes = useStyles({ paddingTop });

    return (
      <div ref={ref} className={classes.root}>
        {children}
      </div>
    );
  },
);

export default AspectRatio;
