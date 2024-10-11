import { App } from "@src/App";
import { render } from "solid-js/web";
import { Background } from "./entries/Background";
import { DevTools } from "./entries/DevTools";
import { Options } from "./entries/Options";
import { Popup } from "./entries/Popup";

export const DEV_MODE: boolean = true;

export function initialize(name: String) {
  const root = document.createElement("div");
  root.id = "extension-root";
  document.body.append(root);

  if (DEV_MODE) console.log(`loaded into ${name}`);

  switch (name) {
    case "background":
      render(Background, root);
      break;
    case "devtools":
      render(DevTools, root);
      break;
    case "newtab":
      render(DevTools, root);
      break;
    case "options":
      render(Options, root);
      break;
    case "popup":
      render(Popup, root);
      break;
    default:
      render(App, root);
      break;
  }
}
