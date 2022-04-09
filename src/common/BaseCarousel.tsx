import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, styled, Typography, useTheme } from '@mui/material';
import LoadingIndicator from './LoadingIndicator';
import Slider, { Settings, ResponsiveObject } from 'react-slick';
import React, { useEffect, useRef, useState } from 'react';
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

type BaseCarouselProps = Pick<Settings, 'className'> &
  React.PropsWithChildren<{
    loading: boolean;
    listEmptyMessage?: string;
    slidesToShow: { default: number; md?: number; sm?: number };
  }>;

function BaseCarousel({
  className,
  loading,
  listEmptyMessage = 'Nothing has been found',
  slidesToShow,
  children,
}: BaseCarouselProps) {
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

  if (!React.Children.count(children) && !loading) {
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
          // Enable drag/swipe irrespective of `slidesToScroll`
          swipeToSlide
          // This also fixes item duplication when there are
          // less item than "slidesToShow"
          // https://github.com/akiran/react-slick/issues/1553
          infinite={false}
          arrows={false}
        >
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) {
              return null;
            }

            return (
              <Box
                key={child.key}
                onMouseDownCapture={handleMouseDown}
                onClickCapture={handleChildClick}
              >
                <Box m={CAROUSEL_ITEM_GAP}>{child}</Box>
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
