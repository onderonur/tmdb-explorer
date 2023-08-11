import ErrorMessage from '@/error-handling/ErrorMessage';

// TODO: Bu page'de css yüklenmiyor falan bi garip
export default function NotFoundPage() {
  return <ErrorMessage statusCode={404} message="Not Found" />;
}
