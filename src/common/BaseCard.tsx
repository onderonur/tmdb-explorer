import {
  Card,
  CardActionArea,
  CardContent,
  CardProps,
  styled,
} from '@mui/material';

const StyledCard = styled(Card)({
  backgroundColor: 'transparent',
});

const StyledCardContent = styled(CardContent)({
  padding: 0,
});

type BaseCardProps = CardProps & {
  hasActionArea: boolean;
};

function BaseCard({ hasActionArea, children, ...rest }: BaseCardProps) {
  const content = <StyledCardContent>{children}</StyledCardContent>;

  return (
    <StyledCard elevation={0} {...rest}>
      {hasActionArea ? (
        <CardActionArea>{content}</CardActionArea>
      ) : (
        <>{content}</>
      )}
    </StyledCard>
  );
}

export default BaseCard;
