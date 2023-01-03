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
//require를 쓰는군 기괴하다

export type CustomNextPage<P = {}, IP = P, C = NextPage<P, IP>> = C & {
  auth?: any;
  notPage?: boolean;
};
//제너릭을 총 3개쓰는군 근데 왜 그중에 C밖에 안쓰는거지
//P는 IP를 위한 떨거지고, P와 IP는 C를 위해 만들어진 부품일 뿐이란 건가
//NextPage는 봤던놈이군

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: CustomNextPage;
  pageProps: {
    session: Session | null;
    [_: string]: any;
  };
}

//AppProps는 딱봐도 원래있는애인데 거기에 총 3개를 추가하고있다.
//흥미로운건 session과 저 기괴한 문법은 뭔가..

const MyApp: React.FC<MyAppProps> = ({
  //FC가 뭔가 공부하고와야겠군 Function Component 샤를이 이거때문에 골치아팠다는데 음.. 타입을 그냥 우겨넣기위한 베이스인가
  //다만 children을 갖는다. 익명 함수다. 이 두개를 얻었군
  //defaultProps와의 연결고리를 끊어버린다라..
  //
  emotionCache = createCache({ key: "css", prepend: true }),
  //emotion Cache 캐시를 이용해서 뭔가 저장하려는거같군
  Component,
  //아 얘네 다 FC<Props>에 있던 애들이구나
  pageProps: { session, ...pageProps },
}) => {
  const router = useAnalyticTracker(useRouter());
  //라우터를 이용하는데 자기만의 라우터로 감싸는군. 데코레이터 패턴이라고 할 수 있겠지
  //저걸 이용해서 구글애널리틱스를 router.event에 감시시켰군.. 심오하다
  React.useEffect(() => {
    if (Component.notPage) router.replace("/404");
  }, []);
  //여기가 _app.tsx라는걸 다시 상기시켜주는군.. 라우터를 /404로 바꾸는군
  if (Component.notPage) return <></>;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Sharlotte's Portfolio</title>
        {/* 여기는 평범하군 title, meta-name. 그리고 content*/}
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <MainThemeProvider>
        <CssBaseline />
        <SessionProvider session={session}>
          {/* 너뭐야 원래있는애구만*/}

          <SnackbarProvider
            maxSnack={3}
            Components={{ lifebar: LifebarSnackbar }} //여기 예 맞습니다 라이브러리 문서 드릴까요//아하 여기서 주입하면 저기서도 쓸수있게도니ㅡㄴ거군요 네넵 예쁘더라고요
            //https://notistack.com/features/customization
            //이거 child requirements 꼭 참고하세요. LifebarSnackbar도 requirement 맞춰서 한거
          >
            {/* 스낵바를 위해 무언가 주는거구만*/}
            <AuthWrapper auth={Component.auth}>
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
