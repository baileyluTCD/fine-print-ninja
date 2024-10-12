import { initialize } from ".";
import titles from "./assets/data/termsAndConditionsTitles.json";
import { Entry } from "./types/Entry";

const pageContent = document.body.innerText.toLowerCase();

const foundTitles = titles.filter((title) =>
  pageContent.includes(title.toLowerCase())
);

if (foundTitles.length > 0)
  initialize(Entry.Popup);

let termsElement = document.querySelector(".terms, #terms, .terms-and-conditions");

alert(termsElement.textContent);