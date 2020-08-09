import React from 'react';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import LoadingIndicator from '@/components/LoadingIndicator';
import { InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import AutoSearchSuggestion from './AutoSearchSuggestion';

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
}) {
  const classes = useStyles();

  function handleInputChange(event) {
    const value = event.target.value;
    onInputValueChange(value);
  }

  return (
    <Downshift
      // If you're server rendering downshift, you need to provide an id prop
      // that is the same on the server as it will be on the client:
      // https://github.com/downshift-js/downshift/issues/602#issuecomment-429663734
      id="autosearch"
      inputValue={inputValue}
      onSelect={onItemSelect}
      itemToString={(item) => item?.title || ''}
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
              InputLabelProps={getLabelProps({ shrink: true })}
              InputProps={{
                ...inputProps,
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
                    {suggestions.map((suggestion, index) => {
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
