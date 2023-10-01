import Box from "@mui/material/Box";
import Seciton from "./components/Section";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSpeechContext } from "./contexts/Speech.context";
import useWebSpeechApi from "./hooks/useWebSpeechApi";
import useOpenai from "./hooks/useOpenai";

function App() {
  const { isRecording, setIsRecording, rawTexts, formattedTexts } =
    useSpeechContext();

  useWebSpeechApi();
  useOpenai();

  return (
    <Box sx={{ width: "100%" }}>
      <Box component="h1">議事録デモ</Box>
      <Button variant="contained" onClick={() => setIsRecording((cur) => !cur)}>
        {isRecording ? "録音停止" : "録音開始"}
      </Button>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ width: "100%" }}
      >
        <Seciton title="Web Speech API 原文" texts={rawTexts} />
        <Seciton
          title="Web Speech API 整形（GPT-3.5）"
          texts={formattedTexts}
        />
        <Seciton title="議事録（GPT-4）" texts={[]} />
      </Stack>
    </Box>
  );
}

export default App;
