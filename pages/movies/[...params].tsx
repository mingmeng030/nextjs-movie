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
    <div className={`${styles.container}`}>
      <Seo title={title}></Seo>
      <p className={`${styles.title}`}>{title} </p>
      {key ? (
        <iframe
          className={`${styles.videoContainer}`}
          src={`https://www.youtube.com/embed/${key}?autoplay=0`}
        />
      ) : (
        <p>There's no video to play.</p>
      )}
      <div className={`${styles.bottom}`}>
        {`https://image.tmdb.org/t/p/w200${imgPath}` && (
          <img
            className={`${styles.poster}`}
            src={`https://image.tmdb.org/t/p/w200${imgPath}`}
          />
        )}
        <p className={`${styles.content}`}>{content}</p>
      </div>
      <div className={`${styles.detailSwiper}`}>
        <MovieSwiper
          dataList={similarResults}
          title={`movies like "${title}"`}
          spaceBetween={10}
          slidesPerView={7}
        ></MovieSwiper>
      </div>
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
