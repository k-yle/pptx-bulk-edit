import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { App } from "./App";

createRoot(document.querySelector("#root")!).render(
  <StrictMode>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ fontFamily: "Nunito" }}
    >
      <App />
    </MantineProvider>
  </StrictMode>,
);
