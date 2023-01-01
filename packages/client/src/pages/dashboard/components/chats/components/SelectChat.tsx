import { Box, Paper, Typography } from "@mui/material";
import { StartConvesationIcon } from "./StartConvesationIcon";

export const SelectChat = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Paper
        elevation={1}
        sx={{
          width: {
            xs: "300px",
            md: "400px",
          },
          height: {
            xs: "300px",
            md: "400px",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
        }}
      >
        <StartConvesationIcon sx={{ fontSize: 200 }} />
        <Typography variant="h4" sx={{ color: "common.black", fontSize: 16 }}>
          Select chat to start conversation
        </Typography>
      </Paper>
    </Box>
  );
};
