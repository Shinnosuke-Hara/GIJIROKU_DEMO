import Openai from "openai";
import { useCallback, useEffect, useState } from "react";
import { useSpeechContext } from "../contexts/Speech.context";

const openai = new Openai({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function useOpenai() {
  const { rawTexts, setFormattedTexts } = useSpeechContext();
  const [prevRawTexts, setPrevRawTexts] = useState(rawTexts);

  const formatText = useCallback(async () => {
    if (rawTexts.length === prevRawTexts.length) return;
    console.log("start!");
    const newRawTexts = rawTexts.slice(prevRawTexts.length);

    for (const newRawText of newRawTexts) {
      if (newRawText === "") continue;
      const { choices } = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "assistant",
            content:
              "次の文章を、口調は維持したままで誤字を修正して下さい。レスポンスは修正後の文章のみにして下さい。",
          },
          {
            role: "user",
            content: `${newRawText}`,
          },
        ],
      });
      const formattedText = choices[0].message.content;

      if (formattedText !== null) {
        console.log(formattedText);
        setFormattedTexts((prev) => [...prev, formattedText]);
      }
    }
    setPrevRawTexts(rawTexts);
  }, [rawTexts, prevRawTexts]);

  useEffect(() => {
    const timer = setInterval(() => {
      formatText();
    }, 5000);
    return () => clearInterval(timer);
  }, [formatText]);
}
