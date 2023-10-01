import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { memo } from "react";

interface Props {
  title: string;
  texts: string[];
}

const Seciton = memo(({ title, texts }: Props) => (
  <Box
    sx={{
      boxShadow:
        "0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12);",
      width: "60%",
      height: "100vh",
      overflow: "scroll",
      borderRadius: 4,
      p: 3,
    }}
  >
    <Box>
      <Typography component="h2" sx={{ fontSize: 22, mb: 2 }}>
        {title}
      </Typography>
    </Box>
    <Box>
      {texts.map((text) => (
        <Typography sx={{ fontSize: 18, mb: 1 }} key={text}>
          {text}
        </Typography>
      ))}
    </Box>
  </Box>
));

export default Seciton;
