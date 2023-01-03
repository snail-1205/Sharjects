import React, { type PropsWithChildren } from "react";

import * as Colors from "@mui/material/colors";
import { createTheme, type Theme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";

import type { PaletteMode } from "@mui/material";
import type { PaletteColor, PaletteColorOptions } from "@mui/material/styles";
import type { Color } from "@mui/material";

//테마를 덕지덕지 발라서, 결국에는 _app.tsx에 모여서 묶이는군

type Partialize<T> = {
  [P in keyof T]?: T[P] extends Function
    ? T[P]
    : T[P] extends PaletteColor
    ? PaletteColorOptions
    : Partial<T[P]>;
}; //얘는 뭘까.. 아주 따라가보자 걍 음.. 결국에는 T를 넣으면 T의 key와 value에 따라서 T[P](원래값)을 줄 것인지 PalletteColorOption이라 지칭할 건지 정하는거군
//그런데 저기 물음표는 왜있는지궁금한데 있을수도있고 없을수도 있다는 뜻이겠지.. //

type CustomPalette = Record<"themedWhite" | "themedBlack", PaletteColor> &
  Record<"accent" | "health", Color>; //팔레트라는 새로운 개념인가.. Record를 인터섹션해서 만들어내는군

declare module "@mui/material/styles" {
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends Partialize<CustomPalette> {}
}

type ColorPalette = Exclude<keyof typeof Colors, "common">;
//Colors를 mui로부터 가져와서 그냥 걸러버리네
const getDesignTokens = (mode: PaletteMode, palette: ColorPalette) =>
  ({
    palette: {
      mode,
      primary: {
        main: Colors[palette][300],
      },
      themedBlack: { main: mode === "light" ? "black" : "white" },
      themedWhite: { main: mode === "light" ? "white" : "black" },
      text: {
        ...(mode === "light"
          ? {
              primary: Colors.grey[900],
              secondary: Colors.grey[500],
            }
          : {
              primary: "#fff",
              secondary: Colors.grey[500],
            }),
      },
    },
  } as Theme);
//익명함수인데.. 팔레트, 모드를 받아서 결국엔 테마를 뱉어내는군
//테마는 팔레트가 있고, 그안에 모드가 존재하는군
//primary, themedBlack, themeWhite, text를 추가로 가지는데
//그냥 나중에 쓰일거같군 이름이 디자인의 토큰을 얻게한거라는데 흠흠..

//token이라고 표현하신 이유? 이러한 Theme의 document?

interface ThemeController {
  toggleColorMode(): void;
  setColorPalette(value: ColorPalette): void;
  currentColors: typeof Colors[ColorPalette];
  palette: ColorPalette;
}
const ControllerContext = React.createContext<ThemeController>({
  toggleColorMode: () => {
    throw new Error("subscribed out of provider!");
  },
  setColorPalette: () => {
    throw new Error("subscribed out of provider!");
  },
  currentColors: Colors.blue,
  palette: "blue",
});
//

const MainThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  //알겠다.. 그냥 알아버린거시야 이걸 _app에 바름으로써 테마가 상태로 저장되고 변화되간다..
  const [palette, setPalette] = React.useState<ColorPalette>("blue");

  React.useEffect(() => {
    const mode = localStorage.getItem("themeMode") as PaletteMode | null;
    const palette = localStorage.getItem("themeColor") as ColorPalette | null;
    if (mode) setMode(mode);
    if (palette) setPalette(palette);
  }, []);

  const defaultControllerContext: ThemeController = {
    toggleColorMode() {
      localStorage.setItem("themeMode", mode === "light" ? "dark" : "light");
      setMode((prev) => (prev === "light" ? "dark" : "light"));
    },
    setColorPalette(value: ColorPalette) {
      localStorage.setItem("themeColor", value);
      setPalette(value);
    },
    currentColors: Colors[palette],
    palette,
  }; //저어기있던걸 왜 재정의했지?? //

  // Update the theme only if the mode changes
  const theme = React.useMemo(
    () => createTheme(getDesignTokens(mode, palette)),
    [mode, palette]
  );
  //memo는 박힌 제너릭때문에 리턴타입이 파라미터와 같아지는군
  //theme를 하나 만들고, useMemo를 통해서 mode, palette가 바뀔때만 바뀌게한다..

  return (
    <ControllerContext.Provider value={defaultControllerContext}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ControllerContext.Provider>
    //이 복잡한 구조를 알 수가 없군요 ㅜㅜ
  );
};

export function useThemeController(): ThemeController {
  return React.useContext(ControllerContext);
  //어이 에러덩어리인 얘를 쓰면 어카노
}

export default MainThemeProvider;
