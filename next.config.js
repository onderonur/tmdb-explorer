module.exports = {
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
