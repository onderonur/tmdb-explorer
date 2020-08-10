import React from 'react';
import ErrorMessage from '@/components/ErrorMessage';

function NotFound404() {
  return <ErrorMessage statusCode={404} message="Page Not Found" />;
}

export default NotFound404;
