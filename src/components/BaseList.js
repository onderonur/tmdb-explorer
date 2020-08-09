import React from 'react';
import { List } from '@material-ui/core';
import LoadingIndicator from './LoadingIndicator';

function BaseList({
  data,
  renderItem,
  loading,
  listEmptyMesage = 'Nothing has been found',
}) {
  if (loading) {
    return <LoadingIndicator loading />;
  } else if (!data.length) {
    return listEmptyMesage;
  }

  return <List>{data.map((item, index) => renderItem(item, index))}</List>;
}

export default BaseList;
