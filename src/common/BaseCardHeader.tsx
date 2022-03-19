import { CardHeader, CardHeaderProps, styled } from '@mui/material';

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  padding: theme.spacing(1),
  '.MuiCardHeader-title': {
    fontWeight: theme.typography.fontWeightBold,
  },
}));

type BaseCardHeaderProps = CardHeaderProps;

function BaseCardHeader(props: BaseCardHeaderProps) {
  return (
    <StyledCardHeader
      {...props}
      titleTypographyProps={{
        variant: 'subtitle2',
      }}
      subheaderTypographyProps={{ variant: 'subtitle2' }}
    />
  );
}

export default BaseCardHeader;
