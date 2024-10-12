import { App } from "@src/App";
import { Context, createContext, createSignal, Signal } from "solid-js";
import { render } from "solid-js/web";
import { Background } from "./entries/Background";
import { DevTools } from "./entries/DevTools";
import { NewTab } from "./entries/NewTab";
import { Options } from "./entries/Options";
import { Popup } from "./entries/Popup";
import { Entry } from "./types/Entry";
import { Settings } from "./types/Settings";

export const DEV_MODE: boolean = true;

const SettingsContext: Context<Signal<Settings>> = createContext(
  createSignal(Settings.default())
);

export function SettingsProvider(props) {
  const value = createSignal(Settings.default());

  return (
    <SettingsContext.Provider value={value}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export function initialize(name: Entry) {
  const root = document.createElement("div");
  root.id = "extension-root";
  document.body.append(root);

  if (DEV_MODE) console.log(`loaded into ${name}`);

  switch (name) {
    case Entry.Background:
      render(
        () => (
          <SettingsProvider>
            <Background />
          </SettingsProvider>
        ),
        root
      );
      break;
    case Entry.DevTools:
      render(
        () => (
          <SettingsProvider>
            <DevTools />
          </SettingsProvider>
        ),
        root
      );
      break;
    case Entry.NewTab:
      render(
        () => (
          <SettingsProvider>
            <NewTab />
          </SettingsProvider>
        ),
        root
      );
      break;
    case Entry.Options:
      render(
        () => (
          <SettingsProvider>
            <Options />
          </SettingsProvider>
        ),
        root
      );
      break;
    case Entry.Popup:
      render(
        () => (
          <SettingsProvider>
            <Popup />
          </SettingsProvider>
        ),
        root
      );
      break;
    default:
      render(
        () => (
          <SettingsProvider>
            <App />
          </SettingsProvider>
        ),
        root
      );
      break;
  }
}
