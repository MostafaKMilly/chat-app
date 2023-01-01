import { Box, SvgIcon, SvgIconTypeMap } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import { ReactComponent as LogoSvgIcon } from "../../assets/images/logo.svg";

export const LogoIcon = (
  props: DefaultComponentProps<SvgIconTypeMap<{}, "svg">>
) => (
  <Box position="relative" sx={{ height: 0, width: "100%", p: 0, pb: "8%" }}>
    <SvgIcon
      component={LogoSvgIcon}
      sx={{
        height: "100%",
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      {...props}
      inheritViewBox
    ></SvgIcon>
  </Box>
);
