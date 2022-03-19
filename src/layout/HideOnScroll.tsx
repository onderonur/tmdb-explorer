import { Slide, useScrollTrigger } from '@mui/material';

type HideOnScrollProps = React.PropsWithChildren<unknown>;

function HideOnScroll({ children }: HideOnScrollProps) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children as never}
    </Slide>
  );
}

export default HideOnScroll;
