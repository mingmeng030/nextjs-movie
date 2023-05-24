import Head from "next/head";
import { SeoProps } from "./types";

export default function Seo({ title }: SeoProps) {
  return (
    <Head>
      <title>{title}|Next Movies</title>
    </Head>
  );
}
