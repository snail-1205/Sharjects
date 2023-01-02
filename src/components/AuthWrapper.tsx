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

    const id = setTimeout(() => {
      if (status !== "unauthenticated") return;
      enqueueSnackbar("you are not logged in", {
        preventDuplicate: true,
        variant: "lifebar",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
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
  //auth가 되어있는지 확인함으로써 children을 뱉을지 안뱉을지 결정하는군
};

export default AuthWrapper;
