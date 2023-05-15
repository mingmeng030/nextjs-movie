/** @type {import('next').NextConfig} */
const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
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
        source: `/api/movies/upcoming`,
        destination: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/genre/:genre",
        destination: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=:genre&sort_by=popularity.desc&include_adult=false&include_video=false&with_watch_monetization_types=flatrate`,
      },

      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
      {
        source: "/api/search/:keyword/:page",
        destination: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=:keyword&page=:page`,
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
