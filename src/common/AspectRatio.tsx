import React from 'react';
import { styled } from '@mui/material';
import { Maybe } from '@/common/CommonTypes';
import isPropValid from '@emotion/is-prop-valid';

export const getAspectRatioString = (width: number, height: number) =>
  `${width}:${height}`;

interface AspectRatioStyleProps {
  paddingTop: Maybe<number | string>;
}

const Root = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop),
})<AspectRatioStyleProps>(({ paddingTop }) => ({
  overflow: 'hidden',
  position: 'relative',
  height: paddingTop ? 0 : undefined,
  paddingTop: paddingTop || undefined,
  '& > *': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
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

    return (
      <Root ref={ref} paddingTop={paddingTop}>
        {children}
      </Root>
    );
  },
);

export default AspectRatio;
