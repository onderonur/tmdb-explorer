import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete, AutocompleteProps } from '@material-ui/lab';
import LoadingIndicator from '@/common/LoadingIndicator';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { useState } from 'react';

const useStyles = makeStyles(() => ({
  input: {
    width: '100%',
  },
}));

type BaseAutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
> = Pick<
  AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
  | 'options'
  | 'renderOption'
  | 'loading'
  | 'placeholder'
  | 'inputValue'
  | 'onInputChange'
  | 'getOptionLabel'
  | 'getOptionSelected'
  | 'freeSolo'
  | 'value'
  | 'onChange'
  | 'className'
> & { autoFocus?: boolean; onSearchClick: (inputValue: string) => void };

function BaseAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
>({
  className,
  autoFocus,
  onSearchClick,
  ...rest
}: BaseAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>) {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Autocomplete<T, Multiple, DisableClearable, FreeSolo>
      {...rest}
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      className={clsx(className, classes.input)}
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
