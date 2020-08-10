import React from 'react';
import ErrorPage from '@/pages/Error';

function NotFound404() {
  return <ErrorPage statusCode={404} message="Not Found" />;
}

export default NotFound404;
