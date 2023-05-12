import Seo from "../../components/Seo";
import MovieSwiper from "../../components/MovieSwiper";
import styles from "../../styles/MovieDetail.module.css";
import * as type from "./types";

export default function Detail({
  query,
  videoResults,
  similarResults,
}: type.movieDetailProps) {
  const [title, id, imgPath, content] =
    [query.title, query.id, query.imgPath, query.content] || [];

  const key = videoResults[0] ? videoResults[0].key : null;

  return (
    <div className="w-full text-center">
      <Seo title={title}></Seo>
      <p className="text-[20px] font-bold mb-[10px]">{title} </p>
      {key ? (
        <iframe
          className="margincenter block w-[60vw] h-[40vw]"
          src={`https://www.youtube.com/embed/${key}?autoplay=0`}
        />
      ) : (
        <p>There's no video to play.</p>
      )}
      <div className="flexcenter margincenter mt-[50px] w-4/5">
        {`https://image.tmdb.org/t/p/w200${imgPath}` && (
          <img
            className="max-w-full rounded-[20px] mt-[10px] mx-[20px] mb-[30px]"
            src={`https://image.tmdb.org/t/p/w200${imgPath}`}
          />
        )}
        <p className="leading-[25px] w-1/2">{content}</p>
      </div>
      <MovieSwiper
        dataList={similarResults}
        title={`movies like "${title}"`}
        spaceBetween={10}
        slidesPerView={7}
      ></MovieSwiper>
    </div>
  );
}

// getServerSideProps : client에서 작동x server에서만 동작
export async function getServerSideProps({ query }) {
  const videoResults = (
    await (
      await fetch(`http://localhost:3001/api/movie/video/${query.id}`)
    ).json()
  ).results;

  const similarResults = (
    await (
      await fetch(`http://localhost:3001/api/movie/similar/${query.id}`)
    ).json()
  ).results;

  return {
    props: {
      query,
      videoResults,
      similarResults,
    },
  };
}
