import { useState } from 'react';
import LoadingIndicator from '@/common/LoadingIndicator';
import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  AutocompleteProps,
  IconButton,
  TextField,
} from '@mui/material';

type BaseAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = Pick<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  | 'placeholder'
  | 'loading'
  | 'inputValue'
  | 'value'
  | 'options'
  | 'sx'
  | 'getOptionLabel'
  | 'renderOption'
  | 'onInputChange'
  | 'onChange'
  | 'freeSolo'
> & {
  autoFocus?: boolean;
  onSearchClick: (inputValue: string) => void;
};

function BaseAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  autoFocus,
  onSearchClick,
  ...rest
}: BaseAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Autocomplete<T, Multiple, DisableClearable, FreeSolo>
      {...rest}
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      fullWidth
      loadingText={<LoadingIndicator loading={!!rest.loading} />}
      disableClearable={true as DisableClearable}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          autoFocus={autoFocus}
          placeholder={rest.placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <IconButton
                aria-label="Search"
                onClick={() => {
                  setIsOpen(false);
                  onSearchClick(rest.inputValue ?? '');
                }}
              >
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      )}
    />
  );
}

export default BaseAutocomplete;
