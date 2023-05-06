import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import styles from "../styles/NavBar.module.css";
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
    router.push({
      pathname: `/search/${keyword.replace(regex, "+").replace(/-$/, "")}`,
      query: { keyword: keyword },
    });
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

      <div>
        <input type="text" value={keyword} onChange={onChangeKeyword}></input>
        <button onClick={onClickSearch}>검색</button>
      </div>
    </nav>
  );
}
