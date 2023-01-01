import {
  AppBar as MuiAppBar,
  Box,
  IconButton,
  Toolbar,
  useMediaQuery,
  Theme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { LogoIcon } from "../../../../shared/components";
import { AppBarMenu } from "./components";

export const AppBar = ({ toggleDrawer, drawer }: TProps) => {
  const matches = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

  return (
    <MuiAppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        width: "100%",
        py: 1,
        ...(matches && {
          ml: "0px",
          ...(drawer && {
            width: `calc(100% - 260px)`,
            ml: `260px`,
          }),
        }),
      }}
    >
      <Box px={5}>
        <Toolbar
          disableGutters
          variant="dense"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Box display="flex" columnGap={2}>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <LogoIcon sx={{ width: "87px", height: "42px" }} />
          </Box>
          <Box display="flex" columnGap={4} alignItems="center">
            <AppBarMenu />
          </Box>
        </Toolbar>
      </Box>
    </MuiAppBar>
  );
};

type TProps = {
  toggleDrawer?: () => void;
  drawer?: boolean;
};
