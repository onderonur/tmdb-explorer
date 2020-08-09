const { useRouter } = require('next/router');

function useRouterPaths() {
  const router = useRouter();
  return { href: router.pathname, asHref: router.asPath.split('?')[0] };
}

export default useRouterPaths;
