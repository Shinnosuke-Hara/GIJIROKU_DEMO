import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { SpeechProvider } from "./contexts/Speech.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SpeechProvider>
      <App />
    </SpeechProvider>
  </React.StrictMode>
);
