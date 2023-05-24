import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";

import styles from "./styles/NavBar.module.css";
import { config } from "../static/config";

export default function NavBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.currentTarget.value);
    },
    [keyword]
  );

  const onClickSearch = () => {
    if (keyword == "") window.alert("Please enter keyword(s) to search.");
    else {
      router.push({
        pathname: `/search/${keyword
          .replace(config.regex, "+")
          .replace(/-$/, "")}`,
        query: { keyword: keyword },
      });
      setKeyword("");
    }
  };

  return (
    <nav className="flexcenter pt-[50px] pb-[20px]">
      <Link href="/" className={`${styles.link}`}>
        <span
          className={`${
            router.pathname == "/" ? styles.active : styles.default
          }`}
        >
          HOME
        </span>
      </Link>

      <Link href="/genre" className={`${styles.link}`}>
        <span
          className={`${
            router.pathname == "/genre" ? styles.active : styles.default
          }`}
        >
          Genre
        </span>
      </Link>

      <div className="flexcenter">
        <input type="text" value={keyword} onChange={onChangeKeyword}></input>
        <button onClick={onClickSearch}>🔎</button>
      </div>
    </nav>
  );
}
