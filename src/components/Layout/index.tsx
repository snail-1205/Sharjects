import Header from "./Header";
import Footer from "./Footer";
import ScrollFab from "./ScrollFab";
import { MainBody } from "./styled";

export interface LayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, header, footer }) => (
  <>
    <Header additional={header} />
    <ScrollFab />
    <MainBody>{children}</MainBody>
    <Footer additional={footer} />
    {/**
     * 이러면 각 페이지마다 같은 헤더와 푸터를 줄 수 있으니깐 페이지마다 일일이 저 컴포넌트 쓰는것보단 상대적으로 편하죠
     *
     * 아하 ㄷㄷ? 제가 바꿀까용 네넵
     */}
  </>
);

export default Layout;
