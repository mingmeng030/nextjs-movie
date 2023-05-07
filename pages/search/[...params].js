import Seo from "@/components/Seo";
import styles from "../../styles/Search.module.css";
import Link from "next/link";

//검색 결과
export default function searchResult({ results, total_results, keyword }) {
  const regex = /[\s\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/g;
  const keywordToShow = keyword[0].replace(/[+]/g, " ");
  return (
    <div className={`${styles.container}`}>
      <Seo title={"search result"}></Seo>
      <p>"{keywordToShow}" 검색 결과 입니다.</p>
      <p>총 {total_results}개의 검색 결과가 있습니다.</p>

      <div className={`${styles.moviesContainer}`}>
        {results?.map((movie) => (
          <Link
            className={`${styles.movieLink}`}
            href={{
              pathname: `/movies/${movie.title
                .replace(regex, "+")
                .replace(/-$/, "")}/${movie.id}`,
              query: {
                title: movie.title,
                id: movie.id,
                imgPath: movie.poster_path,
                content: movie.overview,
              },
            }}
            key={movie.id}
          >
            <div className={`${styles.imgContainer}`}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                className={`${styles.poster}`}
              />
            </div>

            <p className={`${styles.title}`}>{movie.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

// getServerSideProps : client에서 작동x server에서만 동작
export async function getServerSideProps({ params }) {
  const keyword = params.params;
  const { results, total_results } = await (
    await fetch(`http://localhost:3001/api/search/${keyword}`)
  ).json();

  return {
    props: {
      results,
      total_results,
      keyword,
    },
  };
}
