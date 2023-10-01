import { useEffect } from "react";
import { useSpeechContext } from "../contexts/Speech.context";

const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognizer = new Recognition();
recognizer.interimResults = true;
recognizer.lang = "ja-JP";
recognizer.continuous = true;
recognizer.interimResults = true;

export default function useWebSpeechApi() {
  const { setRawTexts, isRecording } = useSpeechContext();

  useEffect(() => {
    if (!recognizer) return;
    if (isRecording) {
      recognizer.start();
    } else {
      recognizer.stop();
    }
  }, [isRecording]);

  useEffect(() => {
    if (recognizer) {
      recognizer.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i][0].confidence < 0.5) {
            continue;
          }
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            console.log("isFinal");
            setRawTexts((prev) => [...prev, transcript.trim()]);
          } else {
            interimTranscript += transcript;
          }
        }
        console.log(interimTranscript);
      };

      recognizer.onerror = (event) => {
        console.error("Recognition error: ", event.error);
      };
    }
  }, [recognizer]);
}
