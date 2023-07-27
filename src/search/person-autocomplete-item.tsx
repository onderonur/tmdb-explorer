import AutocompleteItem from './autocomplete-item';
import { PersonSearchResult } from './search-types';

type PersonAutocompleteItemProps = { person: PersonSearchResult };

export default function PersonAutocompleteItem({
  person,
  ...rest
}: PersonAutocompleteItemProps) {
  return (
    <AutocompleteItem
      avatarUrl={person.profile_path}
      primaryText={person.name}
      // Required for SearchAutocomplete
      {...rest}
    />
  );
}
