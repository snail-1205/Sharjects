import React from "react";
import { type NextRouter } from "next/router";
import { pageview } from "src/lib/ga";

const useAnalyticTracker = (router: NextRouter) => {
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
  /**
   * router를 wrap해서 새로운 훅을 만드셨는데, 이러한 구조를 통해서 얻은 것은
   * useEffect를 함수 안에 내장시킬 수 있다는 것인가요?
   * router.events를 감시시킬 수 있다는 장점이 있는건가용
   */

  return router;
};

export default useAnalyticTracker;
