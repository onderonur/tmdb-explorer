import { BasePerson } from '@/people/PeopleTypes';
import AutocompleteItem, { AutocompleteItemProps } from './AutocompleteItem';

type PersonAutocompleteItemProps = Pick<
  AutocompleteItemProps,
  'secondaryText'
> & { person: BasePerson };

function PersonAutocompleteItem({
  person,
  secondaryText,
  ...rest
}: PersonAutocompleteItemProps) {
  return (
    <AutocompleteItem
      avatarUrl={person.profile_path}
      primaryText={person.name}
      secondaryText={secondaryText}
      // Required for SearchAutocomplete
      {...rest}
    />
  );
}

export default PersonAutocompleteItem;
