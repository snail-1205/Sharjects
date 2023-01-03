export const pageview = (url: unknown) => {
  window.gtag("config", process.env.GOOGLE_ANALYTICS_ID, {
    page_path: url,
  });
};
//얜 뭔가용
//ga가 google analytic의 약자구나 그런데 저 window 전역변수에 gtag를 선언해서 하는 이유가 궁금합니다
/**
 * 사실 넘어가도 될거같습니다 ga를 제가 안쓸거같긴해서요 직ㅁ 하는 프로젝트에
 * 마지막으로
 * @types/폴더 한번만 봐주시고 가시죵
 *
 */
