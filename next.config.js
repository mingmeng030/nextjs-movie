/** @type {import('next').NextConfig} */
const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  // async redirects() {
  //   return [
  //     {
  //       // source로 이동하면 form으로 가도록
  //       source: "/*",
  //       destination: "/",
  //       permanent: false,
  //     },
  //   ];
  // },
  async rewrites() {
    return [
      {
        source: `/api/movies/popular`,
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/topRated",
        destination: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
      {
        source: "/api/search/:keyword",
        destination: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=:keyword`,
      },
      {
        source: "/api/movie/video/:id",
        destination: `https://api.themoviedb.org/3/movie/:id/videos?api_key=${API_KEY}`,
      },
      {
        source: "/api/movie/similar/:id",
        destination: `https://api.themoviedb.org/3/movie/:id/similar?api_key=${API_KEY}`,
      },
    ];
  },
};
module.exports = nextConfig;
