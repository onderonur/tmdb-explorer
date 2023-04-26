import { Typography, useTheme } from '@mui/material';
import LoadingIndicator from './LoadingIndicator';
import { Children, isValidElement, useRef, useState } from 'react';
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Steppers from './Steppers';

const CAROUSEL_ITEM_GAP = 8;

type BaseCarouselProps = React.PropsWithChildren<{
  loading: boolean;
  listEmptyMessage?: string;
  slidesPerView: { default: number; lg?: number; md?: number; sm?: number };
}>;

function BaseCarousel({
  loading,
  listEmptyMessage = 'Nothing has been found',
  slidesPerView,
  children,
}: BaseCarouselProps) {
  const theme = useTheme();

  const breakpoints = theme.breakpoints.values;

  let swiperBreakpoints: SwiperProps['breakpoints'] = {};

  if (slidesPerView.lg) {
    swiperBreakpoints = {
      ...swiperBreakpoints,
      [breakpoints.lg]: {
        slidesPerView: slidesPerView.lg + 0.5,
      },
    };
  }

  if (slidesPerView.md) {
    swiperBreakpoints = {
      ...swiperBreakpoints,
      [breakpoints.md]: {
        slidesPerView: slidesPerView.md + 0.5,
      },
    };
  }

  if (slidesPerView.sm) {
    swiperBreakpoints = {
      ...swiperBreakpoints,
      [breakpoints.sm]: {
        slidesPerView: slidesPerView.sm + 0.5,
      },
    };
  }

  const swiperRef = useRef<SwiperRef>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  if (!Children.count(children) && !loading) {
    return <Typography>{listEmptyMessage}</Typography>;
  }

  const shouldShowSteppers = !isBeginning || !isEnd;

  return (
    <LoadingIndicator loading={loading}>
      <Swiper
        ref={swiperRef}
        spaceBetween={CAROUSEL_ITEM_GAP}
        slidesPerView={slidesPerView.default + 0.5}
        breakpoints={swiperBreakpoints}
        onInit={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {Children.map(children, (child) => {
          if (!isValidElement(child)) {
            return null;
          }

          return <SwiperSlide key={child.key}>{child}</SwiperSlide>;
        })}
        {shouldShowSteppers && (
          <Steppers
            onClickPrevious={
              !isBeginning ? () => swiperRef.current?.swiper.slidePrev() : null
            }
            onClickNext={
              !isEnd ? () => swiperRef.current?.swiper.slideNext() : null
            }
          />
        )}
      </Swiper>
    </LoadingIndicator>
  );
}

export default BaseCarousel;
