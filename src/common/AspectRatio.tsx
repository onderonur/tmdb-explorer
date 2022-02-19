import React from 'react';
import { styled } from '@mui/material';
import isPropValid from '@emotion/is-prop-valid';

interface AspectRatioStyleProps {
  paddingTop: string;
}

const Root = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop),
})<AspectRatioStyleProps>(({ paddingTop }) => ({
  overflow: 'hidden',
  position: 'relative',
  height: 0,
  paddingTop,
  '& > *': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));

type AspectRatioProps = React.PropsWithChildren<{
  aspectRatio: number;
}>;

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio({ aspectRatio, children }, ref) {
    const paddingTop = `${Math.pow(aspectRatio, -1) * 100}%`;

    return (
      <Root ref={ref} paddingTop={paddingTop}>
        {children}
      </Root>
    );
  },
);

export default AspectRatio;
