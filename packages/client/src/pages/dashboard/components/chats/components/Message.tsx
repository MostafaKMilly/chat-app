import { Paper, Typography, Box } from "@mui/material";

export const Message = ({ content, type }: MessageProps) => {
  return (
    <Box
      sx={{
        textAlign: type === "recipient" ? "-webkit-right" : "-webkit-left",
      }}
    >
      <Paper
        sx={{
          p: 3,
          width: "fit-content",
          minHeight: "fit-content",
          maxwidth: "450px",
          maxHeight: "160px",
          backgroundColor:
            type === "recipient" ? "secondary.light" : "primary.light",
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
