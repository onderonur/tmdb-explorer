import ImageGalleryModal from '@/media-gallery/ImageGalleryModal';
import { Person } from '@/people/PeopleTypes';
import { useQuery } from '@tanstack/react-query';
import BaseCarousel from '@/common/BaseCarousel';
import ImageCarouselItem from '@/common/ImageCarouselItem';
import { peopleAPI } from '@/people/peopleAPI';

interface PersonImageCarouselProps {
  person: Person;
}

function PersonImageCarousel({ person }: PersonImageCarouselProps) {
  const { data, isLoading } = useQuery(peopleAPI.personDetails(person.id));
  const filePaths =
    data?.images.profiles.map((profile) => profile.file_path) || [];

  return (
    <>
      <BaseCarousel
        // To reset the carousel as user redirects from person to another person
        key={person.id}
        loading={isLoading}
        slidesPerView={{ default: 2, md: 5, lg: 7 }}
        listEmptyMessage="No image has been found."
      >
        {filePaths.map((filePath, i) => {
          return (
            <ImageCarouselItem
              key={filePath}
              filePath={filePath}
              imageAlt={`Person Carousel Image ${i + 1}`}
              width={2}
              height={3}
            />
          );
        })}
      </BaseCarousel>
      <ImageGalleryModal title={person.name} filePaths={filePaths} />
    </>
  );
}

export default PersonImageCarousel;
