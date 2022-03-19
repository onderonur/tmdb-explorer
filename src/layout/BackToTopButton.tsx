import { Fab, Grow, useScrollTrigger, styled } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const THRESHOLD = 300;

function handleClick() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  bottom: 20,
  right: 20,
  zIndex: theme.zIndex.appBar,
}));

function BackToTopButton() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: THRESHOLD,
  });

  return (
    <Grow in={trigger}>
      <StyledFab
        aria-label="Back to Top"
        color="secondary"
        size="medium"
        onClick={handleClick}
      >
        <KeyboardArrowUpIcon fontSize="large" />
      </StyledFab>
    </Grow>
  );
}

export default BackToTopButton;
