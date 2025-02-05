import styled from "@mui/system/styled";

export const ProfileContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  whiteSpace: "nowrap",
  margin: "0 10px",
  width: "100%",
  "& .MuiAvatar-root": {
    padding: "4px",
    margin: "4px",
    width: "35px",
    height: "35px",
    backgroundColor: "rgba(0,0,0,0)",
    color: theme.palette.mode === "dark" ? "white" : "black",
  },
  "& button": {
    flex: 2,
  },
}));

export const MainBody = styled("main")(({ theme }) =>
  theme.unstable_sx({
    minHeight: "100vh",
    padding: "60px 0 20px 0",
  })
);
