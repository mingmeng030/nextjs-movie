import Seo from "../components/Seo";
import MovieSwiper from "../components/MovieSwiper";
import * as type from "./types";

export default function Home({
  popularResults,
  topRatedResults,
  upcomingResults,
}: type.homeProps) {
  return (
    <div>
      <Seo title={"Home"}></Seo>
      <MovieSwiper
        dataList={popularResults}
        title={"popular movie"}
        spaceBetween={0}
        slidesPerView={6}
      ></MovieSwiper>
      <MovieSwiper
        dataList={topRatedResults}
        title={"top rated movie"}
        spaceBetween={0}
        slidesPerView={6}
      ></MovieSwiper>
      <MovieSwiper
        dataList={upcomingResults}
        title={"upcoming movie"}
        spaceBetween={0}
        slidesPerView={6}
      ></MovieSwiper>
    </div>
  );
}

export async function getServerSideProps() {
  const popularResults = (
    await (await fetch(`http://localhost:3001/api/movies/popular`)).json()
  ).results;

  const topRatedResults = (
    await (await fetch(`http://localhost:3001/api/movies/topRated`)).json()
  ).results;

  const upcomingResults = (
    await (await fetch(`http://localhost:3001/api/movies/upcoming`)).json()
  ).results;

  return {
    props: {
      popularResults,
      topRatedResults,
      upcomingResults,
    },
  };
}
