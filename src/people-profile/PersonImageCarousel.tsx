import React from 'react';
import ImageGalleryModal from '@/media-gallery/ImageGalleryModal';
import { Person } from '@/people/PeopleTypes';
import { useQuery } from 'react-query';
import BaseCarousel from '@/common/BaseCarousel';
import ImageCarouselItem from '@/common/ImageCarouselItem';
import { peopleQueries } from '@/people/peopleQueries';

interface PersonImageCarouselProps {
  person: Person;
}

function PersonImageCarousel({ person }: PersonImageCarouselProps) {
  const { data, isLoading } = useQuery(peopleQueries.personDetails(person.id));
  const filePaths =
    data?.personImages.profiles.map((profile) => profile.file_path) || [];

  return (
    <>
      <BaseCarousel
        // To reset the carousel as user redirects from person to another person
        key={person.id}
        items={filePaths}
        loading={isLoading}
        slidesToShow={{ default: 7, md: 5, sm: 3 }}
        keyExtractor={(filePath) => filePath}
        listEmptyMessage="No image has been found."
        renderItem={(filePath, i) => {
          return (
            <ImageCarouselItem
              filePath={filePath}
              imageAlt={`Person Carousel Image ${i + 1}`}
              width={2}
              height={3}
            />
          );
        }}
      />
      <ImageGalleryModal title={person.name} filePaths={filePaths} />
    </>
  );
}

export default PersonImageCarousel;
