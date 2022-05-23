import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { magic } from "../lib/magic-client";

import "../styles/globals.css";
import Loading from "../components/loading/loading";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const redirectIfLoggedIn = async () => {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn) {
        router.push("/");
      } else {
        router.push("/login");
      }
    };
    redirectIfLoggedIn();
  }, []);

  useEffect(() => {
    const completeRouteChangeHandler = () => {
      setIsLoading(false);
    };
    router.events.on("routeChangeComplete", completeRouteChangeHandler);
    router.events.on("routeChangeError", completeRouteChangeHandler);
    return () => {
      router.events.off("routeChangeComplete", completeRouteChangeHandler);
      router.events.off("routeChangeError", completeRouteChangeHandler);
    };
  }, [router]);

  return isLoading ? <Loading /> : <Component {...pageProps} />;
}

export default MyApp;
