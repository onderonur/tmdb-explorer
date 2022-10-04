import NextLink from '@/routing/NextLink';
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
  href?: string;
};

function BaseCard({ href, children, ...rest }: BaseCardProps) {
  const content = <StyledCardContent>{children}</StyledCardContent>;

  return (
    <StyledCard elevation={0} {...rest}>
      {href ? (
        <CardActionArea LinkComponent={NextLink} href={href}>
          {content}
        </CardActionArea>
      ) : (
        content
      )}
    </StyledCard>
  );
}

export default BaseCard;
