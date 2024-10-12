import "@src/styles/index.css";
import { Switch } from "@suid/material";
import { createSignal, useContext } from 'solid-js';
import { SettingsContext } from '..';

export function Options() {
  const [checked, setChecked] = createSignal(false);
  const [settings, setSettings] = useContext(SettingsContext);
  settings()


  return (
    <main class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-2xl font-bold mb-12">Fine Print Ninja Options</h1>
      <p>Enable Autodetection Popup</p>
      
      <Switch
        checked={settings().autoDetectTermsAndConstitions}
        on:change={() => {
          let oldSettings = settings();
          oldSettings.autoDetectTermsAndConstitions = !oldSettings.autoDetectTermsAndConstitions;
          setSettings(oldSettings);
        }}
      />
      <p></p>
      <p>Current Key Bind Shortcut:</p>

      <p>
        {settings().manualTriggerKeyBind.altKey ? "ALT + " : ""}
        {settings().manualTriggerKeyBind.ctrlKey ? " CTRL + " : ""}
        {settings().manualTriggerKeyBind.metaKey ? "META / WINDOWS / COMMAND + " : ""}
        {settings().manualTriggerKeyBind.shiftKey ? " SHIFT + " : ""}
        {settings().manualTriggerKeyBind.key}
      </p>
      <Switch
      checked={checked()}
      onChange={(event, value) => {
        setChecked(value);
      }}
      inputProps={{ "aria-label": "controlled" }}
    />

      
    </main>
  );
}
