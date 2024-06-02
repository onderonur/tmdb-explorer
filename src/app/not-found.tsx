import { ErrorMessage } from '@/core/errors/components/error-message';
import { AppHeaderOffset } from '@/core/layouts/app-header';

export default function NotFoundPage() {
  return (
    <main>
      <AppHeaderOffset>
        <ErrorMessage statusCode={404} message="Not Found" />
      </AppHeaderOffset>
    </main>
  );
}
