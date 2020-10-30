import React from 'react';
import ErrorMessage from '@/modules/errors/ErrorMessage';

function NotFound404() {
  return <ErrorMessage statusCode={404} message="Page Not Found" />;
}

export default NotFound404;
