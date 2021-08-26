import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete, AutocompleteProps } from '@material-ui/lab';
import LoadingIndicator from '@/common/LoadingIndicator';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton } from '@material-ui/core';
import { useState } from 'react';
import { Omit } from './CommonTypes';

type BaseAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = Omit<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  'renderInput'
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      disableClearable={true as any}
      renderInput={(params) => (
        <TextField
          {...params}
          autoFocus={autoFocus}
          placeholder={rest.placeholder}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <IconButton
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
