import React from 'react';
import ImageGridList from '@/common/ImageGridList';
import ImageGalleryModal from '@/media-gallery/ImageGalleryModal';
import useFetch from '@/common/useFetch';
import { Person, PersonImage } from '@/common/CommonTypes';

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
        minItemWidth={80}
        imgSize={{
          width: 2,
          height: 3,
        }}
      />
      <ImageGalleryModal title={person.name} filePaths={filePaths} />
    </>
  );
}

export default PersonImageGridList;
