import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import Header2 from "./Header2";

const Layout = ({ children }) => {
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    console.log("router", router.asPath);

    // Set a timeout to show the header after 2000 milliseconds (2 seconds)
    const headerTimeoutId = setTimeout(() => {
      setShowHeader(true);
    }, 2000);

    // Set a timeout to show the footer after 4000 milliseconds (4 seconds)
    const footerTimeoutId = setTimeout(() => {
      setShowFooter(true);
    }, 4000);

    // Clear the timeouts if the component unmounts or if the route changes
    return () => {
      clearTimeout(headerTimeoutId);
      clearTimeout(footerTimeoutId);
    };
  }, [router.asPath]);

  return (
    <>
      {router?.asPath.includes("admin") ? null : showHeader && <Header />}

      {router?.asPath.includes("Dashboard") ? <Header2 /> : null}

      {children}

      {router?.asPath.includes("admin") ? null : showFooter && <Footer />}
    </>
  );
};

export default Layout;
