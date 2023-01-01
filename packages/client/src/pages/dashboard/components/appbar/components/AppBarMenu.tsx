import { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export const AppBarMenu = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    handleClose();
    navigate("/login");
  };

  return (
    <>
      <IconButton
        sx={{ backgroundColor: "#f9f9f9" }}
        size="small"
        disableRipple
        onClick={handleClick}
      >
        {open ? (
          <ArrowDropUpIcon fontSize="large" />
        ) : (
          <ArrowDropDownIcon fontSize="large" />
        )}
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose} elevation={1}>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: "common.black" }} />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
