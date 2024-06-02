import { LoadingIndicator } from '@/core/ui/components/loading-indicator';
import SearchIcon from '@mui/icons-material/Search';
import type { AutocompleteProps, TextFieldProps } from '@mui/material';
import { Autocomplete, IconButton, TextField } from '@mui/material';
import { useState } from 'react';

type BaseAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = Pick<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
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
  inputProps: Pick<TextFieldProps, 'placeholder' | 'autoFocus'>;
  onSearchClick: (inputValue: string) => void;
};

export function BaseAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  inputProps,
  onSearchClick,
  ...rest
}: BaseAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Autocomplete<T, Multiple, DisableClearable, FreeSolo>
      {...rest}
      open={isOpen}
      onOpen={() => {
        setIsOpen(true);
      }}
      onClose={() => {
        setIsOpen(false);
      }}
      fullWidth
      loadingText={<LoadingIndicator loading={!!rest.loading} />}
      disableClearable={true as DisableClearable}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          InputProps={{
            ...inputProps,
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
