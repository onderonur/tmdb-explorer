import { BasePerson } from '@/people/people-types';
import AutocompleteItem, { AutocompleteItemProps } from './autocomplete-item';

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
