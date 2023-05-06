import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <div className="top-container">
      <NavBar />
      <div className="content">{children}</div>
      <footer>nextjs introduction by mingmeng</footer>
      <style jsx>
        {`
          .top-container {
            background-color: black;
          }
          .content {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </div>
  );
}
