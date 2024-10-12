import "@src/styles/index.css";
import { Switch } from "@suid/material";
import { useContext } from 'solid-js';
import { SettingsContext } from '..';

export function Options() {
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
      <p>Current Key Bind Shortcut:</p>
      <p>{settings().manualTriggerKeyBind.key}</p>
      <p>{settings().manualTriggerKeyBind.altKey.toString()}</p>
      <p>{settings().manualTriggerKeyBind.ctrlKey}</p>
      <p>{settings().manualTriggerKeyBind.metaKey}</p>
      <p>{settings().manualTriggerKeyBind.shiftKey}</p>
      
    </main>
  );
}
