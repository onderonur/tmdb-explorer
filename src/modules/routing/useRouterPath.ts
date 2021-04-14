import { useRouter } from 'next/router';

function useRouterPath() {
  const router = useRouter();
  return { asHref: router.asPath.split('?')[0] };
}

export default useRouterPath;
