import ErrorMessage from '@/error-handling/error-message';
import PageRoot from '@/layout/page-root';

// TODO: Bu page'de css yüklenmiyor falan bi garip
export default function NotFoundPage() {
  return (
    <PageRoot hasHeaderGutter>
      <ErrorMessage statusCode={404} message="Not Found" />
    </PageRoot>
  );
}
