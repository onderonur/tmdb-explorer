import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, styled, Typography, useTheme } from '@mui/material';
import { Maybe } from './CommonTypes';
import LoadingIndicator from './LoadingIndicator';
import Slider, { Settings, ResponsiveObject } from 'react-slick';
import { useEffect, useRef, useState } from 'react';
import Steppers from './Steppers';

const MOVE_DRAG_THRESHOLD = 10;

// This hook is to prevent triggering links after user drags the slider.
// https://github.com/akiran/react-slick/issues/848#issuecomment-682490158
function useDragDetection(): {
  handleMouseDown: () => void;
  dragging: boolean;
} {
  const [mouseDown, setMouseDown] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    let mouseMove = 0;

    function handleMouseUp(): void {
      setMouseDown(false);
    }

    function handleMouseMove(e: MouseEvent): void {
      mouseMove += Math.abs(e.movementX) + Math.abs(e.movementY);
      setDragging(mouseMove > MOVE_DRAG_THRESHOLD);
    }

    if (mouseDown) {
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseDown]);

  function handleMouseDown(): void {
    setMouseDown(true);
    setDragging(false);
  }

  return {
    handleMouseDown,
    dragging,
  };
}

const CAROUSEL_ITEM_GAP = 0.5;

const StyledSlider = styled(Slider)({
  '.slick-track': {
    marginLeft: 0,
  },
});

type BaseCarouselProps<Item> = Pick<Settings, 'className'> & {
  items: Maybe<Item[]>;
  loading: boolean;
  listEmptyMessage?: string;
  slidesToShow: { default: number; md?: number; sm?: number };
  keyExtractor: (item: Item) => React.Key;
  renderItem: (item: Item) => React.ReactNode;
};

function BaseCarousel<Item>({
  className,
  items,
  loading,
  listEmptyMessage = 'Nothing has been found',
  slidesToShow,
  renderItem,
  keyExtractor,
}: BaseCarouselProps<Item>) {
  const theme = useTheme();
  const slickRef = useRef<Slider>(null);

  const breakpoints = theme.breakpoints.values;

  let responsive: ResponsiveObject[] = [];

  if (slidesToShow.md) {
    responsive = [
      ...responsive,
      {
        breakpoint: breakpoints.md,
        settings: {
          slidesToShow: slidesToShow.md + 0.5,
          slidesToScroll: slidesToShow.md,
        },
      },
    ];
  }

  if (slidesToShow.sm) {
    responsive = [
      ...responsive,
      {
        breakpoint: breakpoints.sm,
        settings: {
          slidesToShow: slidesToShow.sm + 0.5,
          slidesToScroll: slidesToShow.sm,
        },
      },
    ];
  }

  const { handleMouseDown, dragging } = useDragDetection();

  function handleChildClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): void {
    if (dragging) {
      e.preventDefault();
    }
  }

  if (!items?.length && !loading) {
    return <Typography>{listEmptyMessage}</Typography>;
  }

  return (
    <LoadingIndicator loading={loading}>
      <Box position="relative">
        <StyledSlider
          ref={slickRef}
          className={className}
          autoplay={false}
          responsive={responsive}
          speed={500}
          initialSlide={0}
          slidesToShow={slidesToShow.default + 0.5}
          slidesToScroll={slidesToShow.default}
          // This also fixes item duplication when there are
          // less item than "slidesToShow"
          // https://github.com/akiran/react-slick/issues/1553
          infinite={false}
          arrows={false}
        >
          {items?.map((item) => {
            return (
              <Box
                key={keyExtractor(item)}
                onMouseDownCapture={handleMouseDown}
                onClickCapture={handleChildClick}
              >
                <Box m={CAROUSEL_ITEM_GAP}>{renderItem(item)}</Box>
              </Box>
            );
          })}
        </StyledSlider>
        <Steppers
          onClickNext={() => slickRef.current?.slickNext()}
          onClickPrevious={() => slickRef.current?.slickPrev()}
        />
      </Box>
    </LoadingIndicator>
  );
}

export default BaseCarousel;
