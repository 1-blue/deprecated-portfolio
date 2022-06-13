import type { AppProps } from "next/app";
import Head from "next/head";

// tailwindcss
import "../styles/globals.css";

// component
import ScrollProgress from "@src/components/ScrollProgress";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>1-blue의 포트폴리오</title>
      </Head>

      <ScrollProgress />

      <main className="no-scrollbar">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
