import Seo from "../components/Seo";
import MovieSwiper from "../components/MovieSwiper";
import * as type from "./types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

//export default 이어야 url로써 사용가능
//function 명은 상관없고 파일명이 url이 된다.
export default function Genre({ genreLists }: type.genreProps) {
  return (
    <div>
      <Seo title={"Genre"}></Seo>
      {genreLists.map((item) => (
        <MovieSwiper
          dataList={item.list}
          title={item.title}
          spaceBetween={0}
          slidesPerView={6}
        ></MovieSwiper>
      ))}
    </div>
  );
}

// getServerSideProps : client에서 작동x server에서만 동작
export async function getServerSideProps() {
  const actionResults = (
    await (await fetch(`http://localhost:3001/api/movies/genre/28`)).json()
  ).results;
  const romanceResults = (
    await (await fetch(`http://localhost:3001/api/movies/genre/10749`)).json()
  ).results;
  const sfResults = (
    await (await fetch(`http://localhost:3001/api/movies/genre/878`)).json()
  ).results;
  const dramaResults = (
    await (await fetch(`http://localhost:3001/api/movies/genre/18`)).json()
  ).results;
  const adventureResults = (
    await (await fetch(`http://localhost:3001/api/movies/genre/12`)).json()
  ).results;
  const musicResults = (
    await (await fetch(`http://localhost:3001/api/movies/genre/10402`)).json()
  ).results;
  const documentaryResults = (
    await (await fetch(`http://localhost:3001/api/movies/genre/99`)).json()
  ).results;
  const animationResults = (
    await (await fetch(`http://localhost:3001/api/movies/genre/16`)).json()
  ).results;

  const genreLists = [
    { list: actionResults, title: "Action" },
    { list: romanceResults, title: "Romance" },
    { list: sfResults, title: "Science Fiction" },
    { list: dramaResults, title: "Drama" },
    { list: adventureResults, title: "Adventure" },
    { list: musicResults, title: "Music" },
    { list: documentaryResults, title: "Documentary" },
    { list: animationResults, title: "Animation" },
  ];
  return {
    props: {
      genreLists,
    },
  };
}
