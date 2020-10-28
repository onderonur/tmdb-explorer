module.exports = {
  images: {
    domains: ['image.tmdb.org'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/movie/popular',
        permanent: true,
      },
    ];
  },
};
