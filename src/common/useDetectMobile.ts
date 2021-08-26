import { useTheme } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';

function useDetectMobile() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return isMobile;
}

export default useDetectMobile;
