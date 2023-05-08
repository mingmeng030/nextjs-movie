import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <div className="bg-black">
      <NavBar />
      <div className="flex items-center	justify-center">{children}</div>
      <footer>nextjs introduction by mingmeng</footer>
      {/* <style jsx>
        {`
          .content {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          flex items-center	justify-center
        `}
      </style> */}
    </div>
  );
}
