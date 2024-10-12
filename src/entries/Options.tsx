import "@src/styles/index.css";
import { Switch } from "@suid/material";
import { createSignal } from "solid-js";

export function Options() {
  const [detectPopup, setDetectPopup] = createSignal(true);

  return (
    <main class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-2xl font-bold mb-12">Fine Print Ninja Options</h1>
      <p>Enable Autodetection Popup</p>
      <Switch
        checked={detectPopup()}
        on:change={() => {
          setDetectPopup(!detectPopup());
        }}
      />
    </main>
  );
}
