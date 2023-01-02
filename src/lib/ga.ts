export const pageview = (url: unknown) => {
  //넌 뭐냐
  //gtag 얘 봤던애인데
  //아 구글 애널리틱스 엔브로부터 불러와서 하는거구나
  window.gtag("config", process.env.GOOGLE_ANALYTICS_ID, {
    page_path: url,
  });
};
