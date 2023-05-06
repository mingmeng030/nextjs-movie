import Seo from "@/components/Seo";
import styles from "../../styles/Home.module.css";

export default function Detail({ query }) {
  const [title, id, imgPath, content] =
    [query.title, query.id, query.imgPath, query.content] || [];

  return (
    <div className="container">
      <Seo title={title}></Seo>
      <p className="title">{title} </p>
      <img src={`https://image.tmdb.org/t/p/w200${imgPath}`} />
      <p className="content">{content}</p>
      <style jsx>{`
        .container {
          width: 100%;
          text-align: center;
        }
        .title {
          font-size: 20px;
          font-weight: 700;
        }
        img {
          max-width: 100%;
          border-radius: 20px;
          margin: 0 0 20px 0;
        }
        .content {
          width: 70%;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}

// getServerSideProps : client에서 작동x server에서만 동작
export async function getServerSideProps({ query }) {
  return {
    props: {
      query,
    },
  };
}
