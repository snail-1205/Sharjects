import React from "react";

import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";

import { CacheProvider, type EmotionCache } from "@emotion/react";
import createCache from "@emotion/cache";

import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";

import CssBaseline from "@mui/material/CssBaseline";

import GithubStaticDataContext from "src/components/GithubStaticDataContext";
import MainThemeProvider from "src/components/MainThemeProvider";
import LifebarSnackbar from "src/components/LifebarSnackbar";
import AuthWrapper from "src/components/AuthWrapper";
import useAnalyticTracker from "src/hooks/useAnalyticTracker";

import "public/styles/global.css";
import {} from "src/@types";

import type { Session } from "next-auth/core/types";
import { AnimatePresence } from "framer-motion";

// for chart.js rendering
require("src/lib/registerChartjs");

export type CustomNextPage<P = {}, IP = P, C = NextPage<P, IP>> = C & {
  auth?: any;
  notPage?: boolean;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: CustomNextPage;
  pageProps: {
    session: Session | null;
    [_: string]: any;
  };
}

const MyApp: React.FC<MyAppProps> = ({
  emotionCache = createCache({ key: "css", prepend: true }),
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useAnalyticTracker(useRouter());
  React.useEffect(() => {
    if (Component.notPage) router.replace("/404");
  }, []);
  if (Component.notPage) return <></>;

  {
    /**
     * 아 이게 잠시만요
     * 일단 저것에 대해 말하기 위해 잠시 메인 페이지로 가자면
     * notPage는 어디서 주입되고 있는지??*/
  }

  return (
    <CacheProvider value={emotionCache}>
      {/**CacheProvider의 목적과 사용법
       * 이것도 키워드 몇개만 좀 던져주시면 제가 공부해보겠습니다
       * 카톡 ㄱㄱ
       *
       *
       *
       *
       */}
      <Head>
        <title>Sharlotte's Portfolio</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MainThemeProvider>
        {/**MainThemeProvider 목적과 사용법
         * 이거 제가 사용해봤느데 이건 나중에 제 코드가서 같이 볼게용 네넵
         * 글 드릴게요 이건 글 있음
         * https://velog.io/@sharlotte_04/Change-Theme-Palette
         * 난해하지만 없는것보단 나을듯
         * 굿굿 ㅎㅎ
         */}
        <CssBaseline />
        <SessionProvider session={session}>
          <SnackbarProvider
            maxSnack={3}
            Components={{ lifebar: LifebarSnackbar }} //여기 예 맞습니다 라이브러리 문서 드릴까요//아하 여기서 주입하면 저기서도 쓸수있게도니ㅡㄴ거군요 네넵 예쁘더라고요
            //https://notistack.com/features/customization
            //이거 child requirements 꼭 참고하세요. LifebarSnackbar도 requirement 맞춰서 한거
          >
            <AuthWrapper auth={Component.auth}>
              {/**AuthWrapper는 어떻게 연동되는가? (들어가보기)
               *
               *
               */}
              <GithubStaticDataContext>
                <AnimatePresence>
                  <Component {...pageProps} />
                </AnimatePresence>
              </GithubStaticDataContext>
            </AuthWrapper>
          </SnackbarProvider>
        </SessionProvider>
      </MainThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;
