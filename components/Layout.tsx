import NavBar from "./NavBar";

export default function Layout({ children }) {
  return (
    <div className="bg-black">
      <NavBar />
      <div className="flex items-center	justify-center">{children}</div>
      <footer>nextjs introduction by mingmeng</footer>
    </div>
  );
}
