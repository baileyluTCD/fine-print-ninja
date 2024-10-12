import { initialize } from ".";
import urlIdents from "./assets/data/termsAndConditionsUrlIdentifiers.json";
import { Entry } from "./types/Entry";

const foundIdents = urlIdents.filter((ident) =>
  window.location.href.includes(ident)
);

if (foundIdents.length > 0) initialize(Entry.Popup);
