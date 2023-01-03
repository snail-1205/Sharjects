import React from "react";
import Link from "next/link";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { motion } from "framer-motion";

import Layout from "src/components/Layout";
import GithubIcon from "src/assets/icons/GithubIcon";
import { MainTitle, MainDescription, keywords } from "src/components/pages";
import Image from "next/image";

const avatarVariants = {
  show: {
    opacity: 1,
    y: 0,
    width: 40,
    height: 40,
    transition: {
      ease: "circInOut",
      delay: keywords.length * 0.8,
    },
  },
  sizeup: {
    width: "min(20vw, 200px)",
    height: "min(20vw, 200px)",
    transition: {
      ease: "circOut",
      delay: keywords.length * 0.8,
    },
  },
};

const Home: React.FC = () => {
  return (
    <Layout>
      {/**layout이 있는 이유?? */}
      {/**
       * Layout 코드 보시면 알겠지만 저기서 헤더/푸터, 사이드바를 주로 다루고 있어요
       * 이해완료
       */}
      <div style={{ minWidth: "50%", margin: "10vh auto 0" }}>
        <div
          style={{
            display: "flex",
            marginBottom: "50px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            variants={avatarVariants}
            animate={["show", "sizeup"]}
            initial={{ opacity: 0, y: -20, width: 40, height: 40 }}
          >
            <Avatar style={{ width: "inherit", height: "inherit" }}>
              <Image
                alt=""
                src="/images/profile/Sharlottes.png"
                fill
                sizes="min(20vw, 200px) auto"
              />
            </Avatar>
          </motion.div>
          <MainTitle />
        </div>
        <MainDescription />
        <Box
          component={motion.div}
          animate={{
            y: 0,
            opacity: 1,
          }}
          initial={{
            y: -50,
            opacity: 0,
          }}
          transition={{
            delay: keywords.length * 0.8 + 1,
            duration: 0.3,
          }}
          sx={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
            width: "100%",
            whiteSpace: "nowrap",
          }}
        >
          {/**display와 flex를 사용하는 법?
           * display: flex는 해당 엘리먼트의 박스 모델을 flexible box로 만들겠다는 소리에요.
           * flex와 grid는 이전의 float 속성을 갈아치운 최신 편의 속성이라 유용하게 쓸스록 매우 편해요 진짜 정말로
           * https://studiomeal.com/archives/533
           * 구글링하면 바로 위에 나오는건데 flex/grid에 대해 설명해주고 있어요
           * 네 박스 모델링이 꽤나 중요한데 인라인과 박스의 차이는 아시나요
           * 그럼 그것부터 아셔야함 flex gird는 그 박스들을 주로 다루기 때문에..
           * 일단 저 flex가 뭔지 바로 아는 방법은 아주 쉽게도 개발자 도구에서 알 수 있는데
           * 잠시 카톡에 스샷 올릴게요
           * 아하 이걸 이해하려면 뭔가 박스에 대한 이해가 필요한거군요 아뇨 css에 대해 지식이 거의 없어서 ㅜㅜ
           * 아하 글쿤요 ㄷㄷ 키워드 이렇게 던져주시면 제가 공부햅겠습니다 네넵
           */}
          <Link href="/timeline">
            <Button variant="contained">Timeline</Button>
          </Link>
          <Link href="/projects">
            <Button variant="contained">Projects</Button>
          </Link>
          <Link href="https://github.com/sharlottes">
            <Button
              variant="contained"
              sx={{ backgroundColor: "black", color: "white" }}
              startIcon={<GithubIcon />}
            >
              Github Profile
            </Button>
          </Link>
        </Box>
      </div>
    </Layout>
  );
};

// 그러니깐 원래
// Home.notPage = true
// 식으로 "이건 /pages 디렉토리에 있지만 페이지가 아님" 이란 의미를 담고자 했어요
// https://velog.io/@sharlotte_04/components-%EB%94%94%EB%A0%89%ED%86%A0%EB%A6%AC-%EA%B5%AC%EC%A1%B0-%EA%B0%9C%EC%84%A0
// 관련 포스트 쓴거 있었고
// 그런데 지금은 이 방식이 너무 비효율적이라 판단해서 그냥 /components/pages/로 넘겼어요. 저거 불필요한 코드라 지워야 하는데 까먹음
//아하 네넵 한번 나중에 정독해보겠습니다!!
// 굳 이해 되셨으면 다음거? 넵
export default Home;
