import { getPersonDetails } from '@/people/people-fetchers';
import { notFound } from 'next/navigation';
import { Container, Divider, Stack } from '@mui/material';
import PersonSummary from '@/people-profile/person-summary';
import SingleRowGridList from '@/common/single-row-grid-list';
import ImageCard from '@/medias/image-card';
import SeeAllLink from '@/common/see-all-link';
import PersonCrewGridList from '@/people-profile/person-crew-grid-list';
import PersonCastingGridList from '@/people-profile/person-casting-grid-list';
import FixedBackgroundImage from '@/common/fixed-background-image';
import type { Metadata } from 'next';
import { getMetadata } from '@/seo/seo-utils';
import SectionTitle from '@/common/section-title';
import Padder from '@/common/padder';
import PageRoot from '@/layout/page-root';
import { getTmdbImageUrl } from '@/tmdb/tmdb-configuration-utils';
import { getTmdbConfiguration } from '@/tmdb/tmdb-configuration-fetchers';

async function getPageData(personId: string) {
  const [tmdbConfiguration, person] = await Promise.all([
    getTmdbConfiguration(),
    getPersonDetails(Number(personId)),
  ]);

  if (!person) {
    notFound();
  }

  return { tmdbConfiguration, person };
}

type PersonPageProps = {
  params: {
    personId: string;
  };
};

export async function generateMetadata({
  params: { personId },
}: PersonPageProps): Promise<Metadata> {
  const { tmdbConfiguration, person } = await getPageData(personId);

  return getMetadata({
    title: person.name,
    description: person.biography,
    pathname: `/people/${personId}`,
    images: [
      {
        url: getTmdbImageUrl({
          tmdbConfiguration,
          imagePath: person.profile_path,
        }),
        alt: person.name,
      },
    ],
  });
}

export default async function PersonPage({
  params: { personId },
}: PersonPageProps) {
  const { person } = await getPageData(personId);

  return (
    <PageRoot hasHeaderGutter>
      <FixedBackgroundImage src={person.profile_path} alt={person.name} />
      <Stack spacing={2}>
        <Container>
          <PersonSummary person={person} />
        </Container>

        <Divider />

        <section>
          <Padder>
            <SectionTitle title="Images" />
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
          </Padder>
          <SeeAllLink
            href={`/people/${person.id}/images${person.images.profiles[0].file_path}`}
            isLinkVisible={!!person.images.profiles.length}
          />
        </section>

        <section>
          <Padder>
            <SectionTitle title="Castings" />
            <PersonCastingGridList person={person} />
          </Padder>
        </section>

        <Divider />

        <section>
          <Padder>
            <SectionTitle title="Crew" />
            <PersonCrewGridList person={person} />
          </Padder>
        </section>
      </Stack>
    </PageRoot>
  );
}
