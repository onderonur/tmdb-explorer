import { getPersonDetails } from '@/people/people-fetchers';
import { notFound } from 'next/navigation';
import { Box, Container, Divider, Stack, Toolbar } from '@mui/material';
import PersonSummary from '@/people-profile/person-summary';
import SingleRowGridList from '@/common/single-row-grid-list';
import ImageCard from '@/medias/image-card';
import SeeAllLink from '@/common/see-all-link';
import PersonCrewGridList from '@/people-profile/PersonCrewGridList';
import PersonCastingGridList from '@/people-profile/PersonCastingGridList';
import FullSizeBackgroundImage from '@/common/full-size-background-image';
import { Metadata } from 'next';
import { getMetadata } from '@/seo/seo-utils';
import SectionTitle from '@/common/movie-details-section-title';

type PersonPageProps = {
  params: {
    personId: string;
  };
};

export async function generateMetadata({
  params: { personId },
}: PersonPageProps): Promise<Metadata> {
  const person = await getPersonDetails(Number(personId));

  if (!person) {
    // TODO: Fix
    return {};
  }

  // TODO: Tamamla
  return getMetadata({
    title: person.name,
    description: person.biography,
    pathname: `/people/${personId}`,
  });
}

export default async function PersonPage({
  params: { personId },
}: PersonPageProps) {
  const person = await getPersonDetails(Number(personId));

  if (!person) {
    return notFound();
  }

  return (
    <>
      <Toolbar />
      <Box sx={{ padding: 2 }}>
        <FullSizeBackgroundImage src={person.profile_path} alt={person.name} />
        <Stack spacing={2}>
          <Container>
            <PersonSummary person={person} />
          </Container>
          <Divider />
          <section>
            <SectionTitle>Images</SectionTitle>
            <SingleRowGridList itemCount={{ xs: 4, sm: 6, lg: 7, xl: 8 }}>
              {person.images.profiles.slice(0, 8).map((image, i) => {
                return (
                  <li key={image.file_path}>
                    <ImageCard
                      href={`/people/${person.id}/images${image.file_path}`}
                      imageSrc={image.file_path}
                      alt={`${person.name} Image - ${i}`}
                      aspectRatio="2 / 3"
                    />
                  </li>
                );
              })}
            </SingleRowGridList>
            <SeeAllLink
              href={`/people/${person.id}/images${person.images.profiles[0].file_path}`}
              isLinkVisible={!!person.images.profiles.length}
            />
          </section>
          <section>
            <SectionTitle>Castings</SectionTitle>
            <PersonCastingGridList person={person} />
          </section>

          <Divider />

          <section>
            <SectionTitle>Crew</SectionTitle>
            <PersonCrewGridList person={person} />
          </section>
        </Stack>
      </Box>
    </>
  );
}