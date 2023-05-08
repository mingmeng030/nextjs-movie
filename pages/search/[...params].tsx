import Seo from "../../components/Seo";
import styles from "../../styles/Search.module.css";
import Link from "next/link";
import * as type from "./types";

//검색 결과
export default function searchResult({
  results,
  total_results,
  keyword,
}: type.searchResultProps) {
  const regex = /[\s\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/g;
  const keywordToShow = keyword[0].replace(/[+]/g, " ");
  return (
    <div className="margincenter w-4/5">
      <Seo title={"search result"}></Seo>
      <p>"{keywordToShow}" 검색 결과 입니다.</p>
      <p>총 {total_results}개의 검색 결과가 있습니다.</p>

      <div className="flexwrap">
        {results?.map((movie) => (
          <Link
            className="px-2 py-4 margincenter"
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
            <div className="min-h-[300px] bg-stone-700 rounded-xl flex">
              {`https://image.tmdb.org/t/p/w200${movie.poster_path}` && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  className={`${styles.poster}`}
                />
              )}
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
