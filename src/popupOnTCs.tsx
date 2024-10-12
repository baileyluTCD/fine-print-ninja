import { initialize } from ".";
import { Entry } from "./types/Entry";

const hostname = window.location.hostname.slice("www.".length);

fetch(
  `https://raw.githubusercontent.com/supdey/tos-dataset/refs/heads/dataset/${hostname}.txt`
)
  .then((response) => response.text())
  .then((text) => {
    if (text.includes("404")) {
      throw new Error("No privacy policy exists on record for this webside");
    } 

    return text;
  })
  .then((text) => {
    initialize(Entry.Popup);
  })
  .catch((err) => console.error(`Error finding privacy policy: ${err}`));
