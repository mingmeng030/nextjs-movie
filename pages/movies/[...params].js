import Seo from "@/components/Seo";
import styles from "../../styles/Movie.module.css";
import MovieSwiper from "@/components/MovieSwiper";

export default function Detail({ query, results, similarResults }) {
  const [title, id, imgPath, content] =
    [query.title, query.id, query.imgPath, query.content] || [];

  const key = results[0] ? results[0].key : null;

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
        <img
          className={`${styles.poster}`}
          src={`https://image.tmdb.org/t/p/w200${imgPath}`}
          placeholder="no image"
        />
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
  const { results } = await (
    await fetch(`http://localhost:3001/api/movie/video/${query.id}`)
  ).json();

  const similarResults = (
    await (
      await fetch(`http://localhost:3001/api/movie/similar/${query.id}`)
    ).json()
  ).results;

  return {
    props: {
      query,
      results,
      similarResults,
    },
  };
}
