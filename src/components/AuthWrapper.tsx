import React from "react";
import { signIn, useSession } from "next-auth/react";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import { useSnackbar } from "notistack";

const AuthWrapper: React.FC<{ children: JSX.Element; auth: any }> = ({
  children,
  auth,
}) => {
  const { status } = useSession({ required: Boolean(auth) });
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  React.useEffect(() => {
    if (!auth || status !== "unauthenticated") return;

    {
      /**auth는 어디서 주입되는가?
       * 이건 제가 설명해드린 notPage 랑 같은 방식이에요. 컴포넌트.auth = {머시깽이};
       * 아하 굿굿
       */
    }

    const id = setTimeout(() => {
      if (status !== "unauthenticated") return;
      enqueueSnackbar("you are not logged in", {
        preventDuplicate: true,
        variant: "lifebar",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        //lifebar라는 custom variable을 만드는 법 저 따라와주쇼
        //이건 나중에 declare module 모여있는 곳 가서 다시 설명해줴숑 넵

        action: (id: any) => (
          <>
            <Button
              onClick={() => signIn()}
              sx={{
                transition:
                  "color,background-color 200ms cubic-bezier(.17,1.78,.74,-1.02)",
                color: "primary.main",
                "&:hover": {
                  color: "white",
                  backgroundColor: "primary.main",
                },
              }}
            >
              {/**&의 사용법, 관련된 document들?
               *
               * 구글링해서 보여드릴라했는데 그냥 말로 설명드릴게요
               * css는 아시죠
               * 그럼
               * .some-box {
               *   background-color: white;
               * }
               *
               * 그렇죠
               *
               * 자 그러면
               * .some-box {
               *   background-color: white;
               * }
               * .some-box:hover {
               *   background-color: blue;
               * }
               * 식으로 이뤄지는것도 아시죠
               * & 얘네는 ctrl 클릭, 호버링으로도 안나오는 애들이라 조금 도움이 필요할거 같아서 요청해 봤어용
               * 네넵 대충은압니당 네 ㅈ러면 img태그 달린 애들이 꾸며지지 않나요?
               *
               * 아 저걸 줄여서 쓴게 굳굳 화이팅임다 고생하셨어요 ㄱㄱ
               * 정답이정도면 도리거같네용 !! 감사합니다:) 그 카톡으로 가시죵
               */}
              Log In
            </Button>
            <IconButton onClick={() => closeSnackbar(id)}>
              <CloseIcon
                sx={{
                  transition: "color 200ms",
                  "&:hover": { color: "primary.main" },
                }}
              />
            </IconButton>
          </>
        ),
      });
    }, 1000);
    return () => clearTimeout(id);
  }, [auth, status]);

  if (auth && status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthWrapper;
