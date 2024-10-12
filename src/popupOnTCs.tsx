import { initialize } from ".";
import titles from "./assets/data/termsAndConditionsTitles.json";
import { Entry } from './types/Entry';

const pageContent = document.body.innerText.toLowerCase();

for (const title of titles) {
  if (pageContent.includes(title.toLowerCase())) {
    initialize(Entry.Popup);
  }
}
