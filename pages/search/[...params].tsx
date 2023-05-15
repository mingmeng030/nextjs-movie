import { useInfiniteQuery } from "react-query";
import { useObserver } from "./useObsever";
import { useRef, useEffect } from "react";
import axios from "axios";

import Seo from "../../components/Seo";
import styles from "../../styles/Search.module.css";
import Link from "next/link";
import * as type from "./types";
import * as commonType from "../../types/commonType";

export default function searchResult({
  total_results,
  keyword,
}: type.searchesultProps) {
  const regex = /[\s\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/g;
  const keywordToShow = keyword[0].replace(/[+]/g, " ");
  const bottom = useRef(null);

  useEffect(() => {
    console.log(keyword[0]);
    getRequestsQuery.remove();
    getRequestsQuery.refetch().then();
    console.log(getRequestsQuery.refetch);
  }, [keyword]);

  const getRequestsQuery = useInfiniteQuery(
    "list",
    ({ pageParam = 1 }) =>
      axios.get(`http://localhost:3001/api/search/${keyword[0]}/${pageParam}`),
    {
      getNextPageParam: (lastPage) => {
        const page = lastPage.data.page;
        if (lastPage.data.total_pages == page) return false;
        return page + 1;
      },
    }
  );

  const onIntersect = ([entry]) =>
    entry.isIntersecting && getRequestsQuery.fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  });

  return (
    <div className="margincenter w-4/5">
      <Seo title={"search result"}></Seo>
      {getRequestsQuery.status === "loading" && <p>불러오는 중</p>}
      {getRequestsQuery.status === "error" && <p>불러오기 실패</p>}

      {getRequestsQuery.status === "success" && getRequestsQuery.data && (
        <>
          <p>"{keywordToShow}" 검색 결과 입니다.</p>
          <p>총 {total_results}개의 검색 결과가 있습니다.</p>

          <div className="flexwrap">
            {getRequestsQuery.data.pages?.map((page) => {
              const movieList: commonType.apiResult[] = page.data.results;
              return movieList.map((movie) => {
                return (
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

// getServerSideProps : client에서 작동x server에서만 동작
export async function getServerSideProps({ params }) {
  const keyword = params.params;
  const { total_results } = await (
    await fetch(`http://localhost:3001/api/search/${keyword}/1`)
  ).json();

  return {
    props: {
      total_results,
      keyword,
    },
  };
}
