import BaseImage from '@/common/BaseImage';
import BaseCard from '@/common/BaseCard';
import BaseCardHeader from '@/common/BaseCardHeader';
import { Person } from '@/people/PeopleTypes';
import useApiConfiguration from '@/api-configuration/ApiConfigurationHooks';
import { Box } from '@mui/material';

interface PersonCardProps {
  person: Person;
}

function PersonCard({ person }: PersonCardProps) {
  const { getImageUrl } = useApiConfiguration();

  return (
    <BaseCard href={`/person/${person.id}`}>
      <Box sx={{ position: 'relative', aspectRatio: '2 / 3' }}>
        <BaseImage
          src={getImageUrl(person.profile_path)}
          alt={person.name}
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <BaseCardHeader title={person.name} />
    </BaseCard>
  );
}

export default PersonCard;
