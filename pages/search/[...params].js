import Seo from "@/components/Seo";
import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";
import Link from "next/link";

//검색 결과
export default function searchResult({
  page,
  results,
  total_results,
  total_pages,
  keyword,
}) {
  const router = useRouter();
  const regex = /[\s\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/g;

  // const [page, setPage] = useState(1);
  const keywordToShow = keyword[0].replace(/[+]/g, " ");
  console.log(results);
  return (
    <div className="container">
      <Seo title={"search result"}></Seo>
      <p>"{keywordToShow}" 검색 결과 입니다.</p>
      <p>총 {total_results}개의 검색 결과가 있습니다.</p>

      <div className={`${styles.moviesContainer}`}>
        {results?.map((movie) => (
          <Link
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
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              className={`${styles.poster}`}
            />
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
  const { page, results, total_results, total_pages } = await (
    await fetch(`http://localhost:3001/api/search/${keyword}`)
  ).json();

  return {
    props: {
      page,
      results,
      total_results,
      total_pages,
      keyword,
    },
  };
}
