import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/globals.css";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
