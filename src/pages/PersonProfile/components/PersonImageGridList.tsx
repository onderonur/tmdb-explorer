import React from 'react';
import ImageGridList from '@/components/ImageGridList';
import ImageGalleryModal from '@/components/ImageGalleryModal';
import { getAspectRatioString } from '@/components/AspectRatio';
import useFetch from '@/hooks/useFetch';
import { Person, PersonImage } from '@/types';

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
