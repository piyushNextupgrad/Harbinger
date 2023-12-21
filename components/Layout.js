import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Layout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    console.log("router", router.asPath);
  }, []);

  return (
    <>
      {router?.asPath == "/admin" ? null : <Header />}
      {children}
      {router?.asPath == "/admin" ? null : <Footer />}
    </>
  );
};

export default Layout;
