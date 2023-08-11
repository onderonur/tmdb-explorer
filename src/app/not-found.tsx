import ErrorMessage from '@/error-handling/ErrorMessage';
import { Toolbar } from '@mui/material';

// TODO: Bu page'de css yüklenmiyor falan bi garip
export default function NotFoundPage() {
  return (
    <>
      <Toolbar />
      <ErrorMessage statusCode={404} message="Not Found" />
    </>
  );
}
