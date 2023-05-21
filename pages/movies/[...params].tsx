import Seo from "../../components/Seo";
import MovieSwiper from "../../components/MovieSwiper";
import * as type from "./types";
import { config } from "../../static/config";

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
          src={`${config.videoUrl}${key}?autoplay=0`}
        />
      ) : (
        <p>There's no video to play.</p>
      )}
      <div className="flexcenter margincenter mt-[50px] w-4/5">
        {`${config.imgUrl}${imgPath}` && (
          <img
            className="max-w-full rounded-[20px] mt-[10px] mx-[20px] mb-[30px]"
            src={`${config.imgUrl}${imgPath}`}
          />
        )}
        <p className="leading-[25px] w-1/2 text-[1.2vw]">{content}</p>
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
export async function getServerSideProps({ query }) {
  const videoResults = (
    await (await fetch(`${config.api}/api/movie/video/${query.id}`)).json()
  ).results;

  const similarResults = (
    await (await fetch(`${config.api}/api/movie/similar/${query.id}`)).json()
  ).results;

  return {
    props: {
      query,
      videoResults,
      similarResults,
    },
  };
}
