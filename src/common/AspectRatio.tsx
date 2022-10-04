import isPropValid from '@emotion/is-prop-valid';
import { styled } from '@mui/material';
import React from 'react';

interface AspectRatioStyleProps {
  aspectRatio: number;
}

const Root = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop as string),
})<AspectRatioStyleProps>(({ aspectRatio }) => ({
  overflow: 'hidden',
  position: 'relative',
  height: 0,
  paddingTop: `${Math.pow(aspectRatio, -1) * 100}%`,
  '& > *': {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
  },
}));

type AspectRatioProps = React.PropsWithChildren<AspectRatioStyleProps>;

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio({ aspectRatio, children }, ref) {
    return (
      <Root ref={ref} aspectRatio={aspectRatio}>
        {children}
      </Root>
    );
  },
);

export default AspectRatio;
