import Head from "next/head";
import * as type from "./types";

export default function Seo({ title }: type.SeoProps) {
  return (
    <Head>
      <title>{title} | Next Movies</title>
    </Head>
  );
}
