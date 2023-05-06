import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div className="content">{children}</div>
      <footer>nextjs introduction by mingmeng</footer>
      <style jsx>
        {`
          .content {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          footer {
            margin: 20px 0;
            color: lightgray;
          }
        `}
      </style>
    </>
  );
}
