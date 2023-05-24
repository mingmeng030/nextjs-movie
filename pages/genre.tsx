import Seo from "../components/Seo";
import MovieSwiper from "../components/MovieSwiper";
import * as type from "../types/genreType";
import { config } from "../static/config";

export default function Genre({ genreMovieLists }: type.genreProps) {
  return (
    <div>
      <Seo title={"Genre"}></Seo>
      {genreMovieLists.map((item, i) => (
        <MovieSwiper
          key={i}
          movieList={item.list}
          title={item.title}
          spaceBetween={0}
          slidesPerView={6}
        ></MovieSwiper>
      ))}
    </div>
  );
}
export async function getServerSideProps() {
  const genreList = [
    { id: 28, genre: "Action" },
    { id: 10749, genre: "Romance" },
    { id: 878, genre: "Sf" },
    { id: 18, genre: "Drama" },
    { id: 12, genre: "Adventure" },
    { id: 10402, genre: "Music" },
    { id: 99, genre: "Documentary" },
    { id: 16, genre: "Animation" },
  ];

  const genreMovieLists = [];

  for (let i = 0; i < genreList.length; i++) {
    const list = (
      await (
        await fetch(`${config.api}/api/movies/genre/${genreList[i].id}`)
      ).json()
    ).results;
    genreMovieLists.push({ list: list, title: genreList[i].genre });
  }

  return {
    props: {
      genreMovieLists,
    },
  };
}
