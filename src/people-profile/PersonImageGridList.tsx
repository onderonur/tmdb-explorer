import React from 'react';
import ImageGridList from '@/common/ImageGridList';
import ImageGalleryModal from '@/media-gallery/ImageGalleryModal';
import { Person } from '@/common/CommonTypes';
import { useQuery } from 'react-query';
import { apiQueries } from '@/http-client/apiQueries';

interface PersonImageGridListProps {
  person: Person;
}

function PersonImageGridList({ person }: PersonImageGridListProps) {
  const { data, isLoading } = useQuery(
    apiQueries.people.personImages(person.id),
  );
  const filePaths = data?.profiles.map((profile) => profile.file_path) || [];
  return (
    <>
      <ImageGridList
        filePaths={filePaths}
        isFetching={isLoading}
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
