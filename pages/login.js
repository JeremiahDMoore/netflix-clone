import { useState, useEffect } from "react";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { magic } from "../lib/magic-client";

import styles from "../styles/Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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

  const loginWithEmailHandler = async (e) => {
    setIsLoading(true);
    if (email) {
      try {
        setIsLoading(true);
        const didToken = await magic.auth.loginWithMagicLink({ email });
        if (didToken) {
          const response = await fetch("api/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${didToken}`,
              "Content-Type": "application/json",
            },
          });

          const loggedInResponse = await response.json();
          if (loggedInResponse.done) {
            router.push("/");
          } else {
            setIsLoading(false);
            setUserMsg("Something went wrong logging in.");
          }
        }
      } catch {
        console.error("Something went wrong logging in", error);
        setIsLoading(false);
      }
    } else {
      setUserMsg("Please enter a valid email address.");
      setIsLoading(false);
    }
  };

  const onChangeEmailHandler = (e) => {
    setUserMsg("");
    const email = e.target.value;
    setEmail(email);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix Sign In</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/login">
            <a>
              <div className={styles.logoWrapper}>
                <Image
                  src={"/static/netflix.svg"}
                  alt="Netflix Logo"
                  width="111px"
                  height="30px"
                />
              </div>
            </a>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={onChangeEmailHandler}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={loginWithEmailHandler} className={styles.loginBtn}>
            {isLoading ? "Loading..." : "Sign In"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
