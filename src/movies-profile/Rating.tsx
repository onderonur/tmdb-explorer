import React from 'react';
import { CircularProgress, Avatar, colors, styled } from '@mui/material';

const StyledAvatar = styled(Avatar)({
  width: 46,
  height: 46,
  backgroundColor: colors.common.white,
});

const Percent = styled('sup')({
  fontSize: '50%',
});

const Value = styled('span')(({ theme }) => ({
  ...theme.typography.button,
}));

interface RatingProps {
  value: number;
}

function Rating({ value }: RatingProps) {
  return (
    <StyledAvatar>
      <CircularProgress
        style={{ position: 'absolute' }}
        variant="determinate"
        value={value}
        color="primary"
        thickness={4}
      />
      <Value>
        {value}
        <Percent>%</Percent>
      </Value>
    </StyledAvatar>
  );
}

export default Rating;
