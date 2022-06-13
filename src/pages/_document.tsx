import Document, { Head, Html, Main, NextScript } from "next/document";

class CustomDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="ko">
        <Head>
          {/* 페비콘 */}
          <link rel="shortcut icon" href="/favicon.ico" />

          {/* SEO */}
          <meta name="keyword" content="프론트엔드, 포트폴리오" />
          <meta name="description" content="1-blue의 포트폴리오" />

          {/* 작성자 */}
          <meta name="author" content="1-blue" />
          {/* 문자 */}
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

          {/* 카카오톡, 네이버 블로그 미리보기 제공할 정보 */}
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="1-blue_portfolio" />
          <meta property="og:locale" content="ko_KR" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="600" />
          <meta property="og:title" content="1-blue의 포트폴리오" />
          <meta property="og:description" content="1-blue의 포트폴리오" />
          <meta
            property="og:url"
            content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`}
          />
          <meta
            property="og:image"
            content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/me.jpg`}
          />

          {/* 구글 폰트 */}
          {/* "jua" - https://fonts.google.com/specimen/Jua?subset=korean#standard-styles */}
          <link
            href="https://fonts.googleapis.com/css2?family=Jua&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
