import React from 'react';
import ImageGridList from '@/modules/shared/ImageGridList';
import ImageGalleryModal from '@/modules/media-gallery/ImageGalleryModal';
import { getAspectRatioString } from '@/modules/shared/AspectRatio';
import useFetch from '@/modules/shared/useFetch';
import { Person, PersonImage } from '@/modules/shared/SharedTypes';

interface PersonImageGridListProps {
  person: Person;
}

function PersonImageGridList({ person }: PersonImageGridListProps) {
  const { data, loading } = useFetch<{ profiles: PersonImage[] }>(
    `/person/${person.id}/images`,
  );
  const filePaths = data?.profiles.map((profile) => profile.file_path) || [];
  return (
    <>
      <ImageGridList
        filePaths={filePaths}
        isFetching={loading}
        aspectRatio={getAspectRatioString(2, 3)}
        minItemWidth={80}
      />
      <ImageGalleryModal title={person.name} filePaths={filePaths} />
    </>
  );
}

export default PersonImageGridList;
