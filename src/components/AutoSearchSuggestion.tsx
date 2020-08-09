import React from 'react';
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem';
import { makeStyles, Theme } from '@material-ui/core';
import { Suggestion, Maybe } from '@/types';

interface AutoSearchSuggestionStyleProps {
  isSelected: boolean;
}

const useStyles = makeStyles<Theme, AutoSearchSuggestionStyleProps>(
  (theme) => ({
    menuItem: {
      fontWeight: ({ isSelected }) => (isSelected ? 600 : 400),
      padding: 0,
    },
  }),
);

type AutoSearchSuggestionProps = {
  suggestion: Suggestion;
  index: number;
  itemProps: MenuItemProps;
  highlightedIndex: Maybe<number>;
  selectedItem: Maybe<Suggestion>;
  renderSuggestion: (suggestion: Suggestion) => React.ReactNode;
};

function AutoSearchSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem,
  renderSuggestion,
}: AutoSearchSuggestionProps) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem?.id === suggestion.id;
  const classes = useStyles({ isSelected });

  return (
    <MenuItem
      // TODO: Needs type fix
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(itemProps as any)}
      selected={isHighlighted}
      component="div"
      dense
      className={classes.menuItem}
    >
      {renderSuggestion(suggestion)}
    </MenuItem>
  );
}

export default AutoSearchSuggestion;
