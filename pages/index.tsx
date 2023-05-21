import Seo from "../components/Seo";
import MovieSwiper from "../components/MovieSwiper";
import * as type from "./types";
import { config } from "../static/config";

export default function Home({
  popularResults,
  topRatedResults,
  upcomingResults,
}: type.homeProps) {
  return (
    <div>
      <Seo title={"Home"}></Seo>
      <MovieSwiper
        movieList={popularResults}
        title={"popular movie"}
        spaceBetween={0}
        slidesPerView={6}
      ></MovieSwiper>
      <MovieSwiper
        movieList={topRatedResults}
        title={"top rated movie"}
        spaceBetween={0}
        slidesPerView={6}
      ></MovieSwiper>
      <MovieSwiper
        movieList={upcomingResults}
        title={"upcoming movie"}
        spaceBetween={0}
        slidesPerView={6}
      ></MovieSwiper>
    </div>
  );
}

export async function getServerSideProps() {
  const popularResults = (
    await (await fetch(`${config.api}/api/movies/popular`)).json()
  ).results;

  const topRatedResults = (
    await (await fetch(`${config.api}/api/movies/topRated`)).json()
  ).results;

  const upcomingResults = (
    await (await fetch(`${config.api}/api/movies/upcoming`)).json()
  ).results;

  return {
    props: {
      popularResults,
      topRatedResults,
      upcomingResults,
    },
  };
}
