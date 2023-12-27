import "@/styles/globals.css";
import Layout from "@/components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster, toast } from "sonner";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Toaster position="top-right" />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
