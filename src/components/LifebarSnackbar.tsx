import React from "react";

import { SnackbarContent, type CustomContentProps } from "notistack";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

import { motion } from "framer-motion";

const LifebarSnackbar: React.FC<CustomContentProps> = React.forwardRef<
  HTMLDivElement,
  CustomContentProps
>(({ id, action, ...props }, ref) => {
  //forwardRef 쓸 때와 사용 이유
  /**
   * 이건 앞서 말씀드렸다시피 requirements 때문이기도 한데 forwardRef 자체만 보자면
   * https://ko.reactjs.org/docs/forwarding-refs.html
   * 문서에서 나와있다시피 ref를 "전달"하기 위한거에요.
   * 여기선 LifebarSnackbar가 외부에서 ref를 받아 SnackbarContent로 ref를 "전달"하기 위해 fowardRef를 쓴거죠
   *
   *
   * HTMLDivElement가 2번째 인자인 ref의 제너릭 타입이고 CustomContentProps가 1번째 인자(지금은 구조분해되어 id, action, ...props인)의 타입
   *
   * 커서 올리면 대부분 타입 나와요 앵간해선 그럼
   * 아하 그렇군요 저 HTMLDivElement CustomContentProps 얘네를 전달하기 위해서인가용??
   * 아 아니구나 얘는 인자를 지정한거군요 아하 아하 그렇군요
   * ㄱㄱ
   * 넵 좋습니다 다음으로 가시죠
   */

  return (
    <SnackbarContent ref={ref}>
      <Card>
        <CardActions>
          <Typography variant="body2" sx={{ marginRight: "10px" }}>
            {props.message}
          </Typography>
          {/** body 2는 무엇인가 mui Typography variant인데 mui theme 맞춰진 스타일을 부여해주는...일종의 css className인 셈
           * https://mui.com/material-ui/customization/default-theme/
           * 여기 MUI 기본 테마가 나와있어요
           * \카토ㅓㄱ ㄱㄱ
           * 완벽한 설명입니다 굿굿 이해완료 와 저런거 원해왔는데 감사합니당
           */}
          {typeof action === "function" ? action(id) : action}
        </CardActions>
        <motion.div
          initial={{
            backgroundColor: "lightGray",
            height: "5px",
            width: "100%",
          }}
          whileInView={{ width: "0%" }}
          transition={{ duration: (props.autoHideDuration ?? 0) / 1000 }}
        />
      </Card>
    </SnackbarContent>
  );
});

export default LifebarSnackbar;
