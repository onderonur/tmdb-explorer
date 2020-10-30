import React, { useCallback } from 'react';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import LoadingIndicator from '@/modules/shared/LoadingIndicator';
import { InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import AutoSearchSuggestion from './AutoSearchSuggestion';
import { Maybe } from '@/modules/shared/SharedTypes';
import { isMovie } from '@/modules/shared/SharedUtils';
import { Suggestion } from './SearcherTypes';

function itemToString(item: Maybe<Suggestion>) {
  return isMovie(item) ? item.title : item?.name || '';
}

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
    maxHeight: 380,
    overflow: 'auto',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
}));

interface AutoSearchProps {
  className?: string;
  label?: string;
  placeholder?: string;
  loading: boolean;
  suggestions: Maybe<Suggestion[]>;
  renderSuggestion: (suggestion: Suggestion) => React.ReactNode;
  inputValue: string;
  onInputValueChange: (inputValue: string) => void;
  onItemSelect: (suggestion: Maybe<Suggestion>) => void;
  onPressEnterOrClickSearch: (inputValue: string) => void;
  autoFocus?: boolean;
  extractSuggestionKey: (suggestion: Suggestion) => React.ReactText;
}

function AutoSearch({
  className,
  label,
  placeholder = 'Search',
  loading,
  suggestions = [],
  renderSuggestion,
  inputValue,
  onInputValueChange,
  onItemSelect,
  onPressEnterOrClickSearch,
  autoFocus,
  extractSuggestionKey,
}: AutoSearchProps) {
  const classes = useStyles();

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      onInputValueChange(value);
    },
    [onInputValueChange],
  );

  return (
    <Downshift
      // If you're server rendering downshift, you need to provide an id prop
      // that is the same on the server as it will be on the client:
      // https://github.com/downshift-js/downshift/issues/602#issuecomment-429663734
      id="autosearch"
      inputValue={inputValue}
      onSelect={onItemSelect}
      itemToString={itemToString}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        highlightedIndex,
        isOpen,
        openMenu,
        closeMenu,
        selectedItem,
      }) => {
        const { onChange, onBlur, onFocus, ...inputProps } = getInputProps({
          placeholder,
        });

        function handlePressEnterOrSearch() {
          onPressEnterOrClickSearch(inputValue);
          closeMenu();
        }

        return (
          <div className={clsx(classes.container, className)}>
            <TextField
              fullWidth={true}
              label={label}
              autoFocus={autoFocus}
              InputLabelProps={getLabelProps()}
              InputProps={{
                // TODO: Needs type fix
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ...(inputProps as any),
                classes: {
                  input: classes.inputInput,
                },
                onChange: (event) => {
                  openMenu();
                  handleInputChange(event);
                  return onChange;
                },
                onBlur,
                onFocus: (e) => {
                  openMenu();
                  return onFocus;
                },
                onKeyPress: (e) => {
                  if (e.key === 'Enter') {
                    handlePressEnterOrSearch();
                  }
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handlePressEnterOrSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <div {...getMenuProps()}>
              {isOpen ? (
                <Paper className={classes.paper} square>
                  <LoadingIndicator loading={loading}>
                    {suggestions?.map((suggestion, index) => {
                      return (
                        <AutoSearchSuggestion
                          key={extractSuggestionKey(suggestion)}
                          suggestion={suggestion}
                          renderSuggestion={renderSuggestion}
                          index={index}
                          itemProps={getItemProps({
                            item: suggestion,
                          })}
                          highlightedIndex={highlightedIndex}
                          selectedItem={selectedItem}
                        />
                      );
                    })}
                  </LoadingIndicator>
                </Paper>
              ) : null}
            </div>
          </div>
        );
      }}
    </Downshift>
  );
}

export default AutoSearch;
