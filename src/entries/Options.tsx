import "@src/styles/index.css";
import { Settings } from '@src/types/Settings';
import { Switch } from "@suid/material";
import { createSignal, onCleanup, useContext } from 'solid-js';
import { SettingsContext } from '..';

export function Options() {
  const [checked, setChecked] = createSignal(false);
  const [settings, setSettings] = useContext(SettingsContext);
  //settings()

  // Function to toggle autodetect terms and conditions
  const toggleAutoDetect = () => {
  const oldSettings = settings(); // Get current settings
  const newSettings = new Settings(
    !oldSettings.autoDetectTermsAndConstitions, // Toggle the autodetect property
    oldSettings.manualTriggerKeyBind // Keep the existing key binding
  );
  setSettings(newSettings); // Update the settings context
};


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
    <main class="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-8">
      <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Fine Print Ninja Options</h1>
        
        <div class="mb-4">
          <p class="text-lg font-semibold text-gray-600 mb-2">Enable Autodetection Popup</p>
          <Switch
            checked={settings().autoDetectTermsAndConstitions}
            onChange={toggleAutoDetect}
            color="primary"
            class="transition-all transform hover:scale-105"
          />
        </div>

        <div class="mb-6">
          <p class="text-lg font-semibold text-gray-600 mb-2">Current Key Bind Shortcut:</p>
          <p class="bg-gray-100 p-2 rounded text-gray-800 border border-gray-300">
            {settings().manualTriggerKeyBind.altKey ? "ALT + " : ""}
            {settings().manualTriggerKeyBind.ctrlKey ? "CTRL + " : ""}
            {settings().manualTriggerKeyBind.metaKey ? "META / WINDOWS + " : ""}
            {settings().manualTriggerKeyBind.shiftKey ? "SHIFT + " : ""}
            {settings().manualTriggerKeyBind.key}
          </p>
        </div>

        <div>
          <p class="text-lg font-semibold text-gray-600 mb-2">Set New Key Bind</p>
          <Switch
            checked={checked()}
            onChange={(event, value) => {
              setChecked(value);
              toggleKeyListener(value);
            }}
            color="secondary"
            class="transition-all transform hover:scale-105"
          />
        </div>
      </div>
    </main>
  );
}