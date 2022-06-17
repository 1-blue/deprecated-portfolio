import type { AppProps } from "next/app";
import Head from "next/head";

// tailwindcss
import "../styles/globals.css";

// component
import ScrollProgress from "@src/components/common/ScrollProgress";
import Button from "@src/components/common/Button";
import Icon from "@src/components/common/Icon";

// hook
import useScrollUpDown from "@src/hooks/useScrollUpDown";

function MyApp({ Component, pageProps }: AppProps) {
  const { pageY } = useScrollUpDown();

  return (
    <>
      <Head>
        <title>1-blue의 포트폴리오</title>
      </Head>

      <ScrollProgress />

      <main className="no-scrollbar">
        <Component {...pageProps} />
      </main>

      {pageY > 0 && (
        <aside>
          <Button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            }
            className="right-8 bottom-8"
          >
            <Icon shape="double-up" className="text-white w-8 h-8" />
          </Button>
        </aside>
      )}
    </>
  );
}

export default MyApp;
