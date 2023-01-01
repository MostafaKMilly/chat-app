import { Paper, Typography, Box } from "@mui/material";
import { useAsyncValue } from "react-router-dom";

export const Message = ({ content, type }: MessageProps) => {
  const data = useAsyncValue();
  console.log(data)
  return (
    <Box
      sx={{ textAlign: type === "sender" ? "-webkit-right" : "-webkit-left" }}
    >
      <Paper
        sx={{
          p: 3,
          width: "fit-content",
          minHeight: "fit-content",
          maxwidth: "450px",
          maxHeight: "160px",
          backgroundColor:
            type === "sender" ? "secondary.light" : "primary.light",
        }}
      >
        <Typography variant="body1" sx={{ color: "common.black" }}>
          {content}
        </Typography>
      </Paper>
    </Box>
  );
};

type MessageProps = {
  type: "sender" | "recipient";
  content: string;
};
