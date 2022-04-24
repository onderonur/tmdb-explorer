import { Typography, useTheme } from '@mui/material';
import LoadingIndicator from './LoadingIndicator';
import React, { useRef, useState } from 'react';
import {
  Swiper,
  SwiperProps,
  SwiperSlide,
  // eslint-disable-next-line import/no-unresolved
} from 'swiper/react';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css';
import Steppers from './Steppers';
import { Swiper as SwiperClass } from 'swiper';
import { Maybe } from './CommonTypes';

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

  const swiperRef = useRef<Maybe<SwiperClass>>(null);
  const [isBeginning, setIsBeginning] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  if (!React.Children.count(children) && !loading) {
    return <Typography>{listEmptyMessage}</Typography>;
  }

  return (
    <LoadingIndicator loading={loading}>
      <Swiper
        spaceBetween={CAROUSEL_ITEM_GAP}
        slidesPerView={slidesPerView.default + 0.5}
        breakpoints={swiperBreakpoints}
        onInit={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          return <SwiperSlide key={child.key}>{child}</SwiperSlide>;
        })}
        <Steppers
          onClickPrevious={
            !isBeginning ? () => swiperRef.current?.slidePrev() : null
          }
          onClickNext={!isEnd ? () => swiperRef.current?.slideNext() : null}
        />
      </Swiper>
    </LoadingIndicator>
  );
}

export default BaseCarousel;
