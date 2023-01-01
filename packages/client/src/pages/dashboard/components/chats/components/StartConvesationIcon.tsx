import { Box, SvgIcon, SvgIconTypeMap } from "@mui/material";
import { DefaultComponentProps } from "@mui/material/OverridableComponent";
import { ReactComponent as StartChatIcon } from "../../../../../assets/images/startConversationImg.svg";

export const StartConvesationIcon = (
  props: DefaultComponentProps<SvgIconTypeMap<{}, "svg">>
) => <SvgIcon component={StartChatIcon} {...props} inheritViewBox></SvgIcon>;
