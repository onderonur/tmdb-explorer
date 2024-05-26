/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // We set image as `unoptimized` to not exceed the
    // fair usage policy of vercel about image optimization.
    // https://vercel.com/docs/platform/fair-use-policy
    // https://nextjs.org/docs/pages/api-reference/components/image#unoptimized
    unoptimized: true,
  },
};

export default nextConfig;
