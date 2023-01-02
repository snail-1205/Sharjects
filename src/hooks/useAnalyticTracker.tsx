import React from "react";
import { type NextRouter } from "next/router";
import { pageview } from "src/lib/ga";

const useAnalyticTracker = (router: NextRouter) => {
  //왜 얘를 썼을까 생각하면서 들여다보자
  React.useEffect(() => {
    const handleRouteChange = (url: any) => {
      pageview(url);
      fetch("/api/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "this is just for": "enabling post method",
        }),
      });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  //useEffect를 여기 숨겨놨는데, router.events를 감시시키기 위해 인가
  //감시를 한 이유는 페이지뷰를 실행하고, api에 fetch를 하기 위해서인가

  return router;
};

export default useAnalyticTracker;
