import React, { createContext, useContext, useMemo, useState } from "react";

interface SpeechContext {
  rawTexts: string[];
  setRawTexts: React.Dispatch<React.SetStateAction<string[]>>;
  formattedTexts: string[];
  setFormattedTexts: React.Dispatch<React.SetStateAction<string[]>>;
  minutes: string[];
  setMinutes: React.Dispatch<React.SetStateAction<string[]>>;
  isRecording: boolean;
  setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SpeechContext = createContext<SpeechContext | undefined>(
  undefined
);

export function useSpeechContext(): SpeechContext {
  const context = useContext(SpeechContext);
  if (context === undefined) {
    throw new Error("SpeechContext is not undefined");
  }
  return context;
}

export function SpeechProvider({ children }: { children: React.ReactNode }) {
  const [rawTexts, setRawTexts] = useState<string[]>([]);
  const [formattedTexts, setFormattedTexts] = useState<string[]>([]);
  const [minutes, setMinutes] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const value = useMemo(
    () => ({
      rawTexts,
      setRawTexts,
      formattedTexts,
      setFormattedTexts,
      minutes,
      setMinutes,
      isRecording,
      setIsRecording,
    }),
    [rawTexts, formattedTexts, minutes, isRecording]
  );
  return (
    <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>
  );
}
