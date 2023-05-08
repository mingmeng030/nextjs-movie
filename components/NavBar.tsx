import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import styles from "./styles/NavBar.module.css";
import React from "react";

export default function NavBar() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const regex = /[\s\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]+/g;

  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.currentTarget.value);
    },
    [keyword]
  );

  const onClickSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (keyword == "") {
      window.alert("Please enter your keyword(s) to search.");
    } else {
      router.push({
        pathname: `/search/${keyword.replace(regex, "+").replace(/-$/, "")}`,
        query: { keyword: keyword },
      });
      setKeyword("");
    }
  };

  return (
    <nav className={`${styles.nav}`}>
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

      <div className="button-container">
        <input type="text" value={keyword} onChange={onChangeKeyword}></input>
        <button onClick={onClickSearch}>🔎</button>
      </div>
    </nav>
  );
}
