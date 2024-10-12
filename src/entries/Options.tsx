import "@src/styles/index.css";
import { Settings } from '@src/types/Settings';
import { Switch } from "@suid/material";
import { createSignal, onCleanup, useContext } from 'solid-js';
import { SettingsContext } from '..';

export function Options() {
  const [checked, setChecked] = createSignal(false);
  const [settings, setSettings] = useContext(SettingsContext);
  //settings()

  // Function to handle keyboard events and update the settings
const handleKeyDown = (event: KeyboardEvent) => {
  // Create a new KeyBind object based on the pressed key
  const newKeyBind = {
    altKey: event.altKey,
    ctrlKey: event.ctrlKey,
    metaKey: event.metaKey,
    shiftKey: event.shiftKey,
    key: event.key.toUpperCase(), // Use uppercase if needed
  };

  // Update settings with the new key binding
  let oldSettings = settings();
  oldSettings.manualTriggerKeyBind = newKeyBind; // Update the key bind in settings
  setSettings(new Settings(oldSettings.autoDetectTermsAndConstitions, newKeyBind)); // Create a new Settings instance
  setChecked(false); // Unset the second switch after the key binding is set
};

  // Adding and removing the keyboard event listener
  const toggleKeyListener = (isEnabled: boolean) => {
    if (isEnabled) {
      window.addEventListener("keydown", handleKeyDown); // Add listener when enabled
    } else {
      window.removeEventListener("keydown", handleKeyDown); // Remove listener when disabled
    }
  };

  // Clean up the event listener when the component is unmounted
  onCleanup(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });


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
        toggleKeyListener(value); // Enable or disable the key listener based on the switch;
        
      }}
      inputProps={{ "aria-label": "controlled" }}
      
    />
    </main>
  );
}
