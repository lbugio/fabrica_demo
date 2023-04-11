import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Layout } from "components/Layout";
import "../styles/globals.css";
import { PageLoader } from "components/PageLoader";
import { Analytics } from "@vercel/analytics/react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setIsLoading(true);
    const handleComplete = (url) =>
      url === router.asPath && setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <Layout>
          <Component {...pageProps} />
          <Analytics />
        </Layout>
      )}
    </>
  );
}

export default MyApp;
