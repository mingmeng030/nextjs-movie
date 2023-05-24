import { useInfiniteQuery } from "react-query";
import { useObserver } from "./useObsever";
import { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

import Seo from "../../components/Seo";
import styles from "../../styles/Search.module.css";
import * as type from "../../types/searchType";
import * as commonType from "../../types/commonType";
import { config } from "../../static/config";

export default function SearchResult() {
  const Router = useRouter();
  const keywordToShow = Router.query.params[0].replace(/[+]/g, " ");
  const bottom = useRef(null);

  const fetchMovies = ({ pageParam = 1 }: type.fetchMovieProps) =>
    axios
      .get(`${config.api}/api/search/${keywordToShow}/${pageParam}`)
      .then((res) => {
        return res;
      });

  const { data, fetchNextPage, status } = useInfiniteQuery(
    ["movielist"],
    fetchMovies,
    {
      getNextPageParam: (lastPage) => {
        const page = lastPage.data.page;
        if (lastPage.data.total_pages == page) return false;
        return page + 1;
      },
    }
  );

  const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  });

  return (
    <div className="margincenter w-4/5">
      <Seo title={"search result"}></Seo>
      {status === "loading" && <p>loading..</p>}
      {status === "error" && <p>loading fail.</p>}
      {status === "success" && data && (
        <>
          <p>Search results for &quot;{keywordToShow}&ldquo;</p>
          <p>total : {data.pages[0].data.total_results}</p>
          <div className="flexwrap">
            {data.pages.map((page) => {
              const movieList: commonType.apiResult[] = page.data.results;
              return movieList.map((movie) => {
                return (
                  <Link
                    className="px-2 py-4 margincenter"
                    href={{
                      pathname: `/movies/${movie.title
                        .replace(config.regex, "+")
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
                      {`${config.imgUrl}${movie.poster_path}` && (
                        <img
                          src={`${config.imgUrl}${movie.poster_path}`}
                          className={`${styles.poster}`}
                        />
                      )}
                    </div>
                    <p className={`${styles.title}`}>{movie.original_title}</p>
                  </Link>
                );
              });
            })}
          </div>
        </>
      )}
      <div ref={bottom} />
    </div>
  );
}
export async function getServerSideProps() {}
