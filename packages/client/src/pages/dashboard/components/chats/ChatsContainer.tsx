import { styled, Container } from "@mui/material";

export const ChatsContainer = styled(Container, {
  shouldForwardProp: (prop) => prop !== "open",
})<ChatsContainerProps>(({ theme, open, state }) =>
  theme.unstable_sx({
    opacity: state === "loading" ? 0.5 : 1,
    position: "relative",
    width: "100%",
    height: "97vh",
    overflow: "hidden",
    mt: 1,
    px: 5,
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      ml: "-260px",
      ...(open && {
        ml: "0px",
        width: `calc(100% - 260px)`,
      }),
    },
  })
);

type ChatsContainerProps = {
  state: "idle" | "loading" | "submitting";
  open: boolean;
};
