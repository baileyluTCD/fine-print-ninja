import { App } from "@src/App";
import { createContext } from "solid-js";
import { render } from "solid-js/web";
import { Background } from "./entries/Background";
import { DevTools } from "./entries/DevTools";
import { NewTab } from "./entries/NewTab";
import { Options } from "./entries/Options";
import { Popup } from "./entries/Popup";
import { Entry } from "./types/Entry";
import { Settings } from "./types/Settings";

export const DEV_MODE: boolean = true;

const SettingsContext = createContext(Settings.default());

export function initialize(name: Entry) {
  const root = document.createElement("div");
  root.id = "extension-root";
  document.body.append(root);

  if (DEV_MODE) console.log(`loaded into ${name}`);

  switch (name) {
    case Entry.Background:
      render(Background, root);
      break;
    case Entry.DevTools:
      render(DevTools, root);
      break;
    case Entry.NewTab:
      render(NewTab, root);
      break;
    case Entry.Options:
      render(Options, root);
      break;
    case Entry.Popup:
      render(Popup, root);
      break;
    default:
      render(App, root);
      break;
  }
}
