import titles from "./assets/data/termsAndConditionsTitles.json";

const pageContent = document.body.innerText.toLowerCase();

for (const title of titles) {
  if (pageContent.includes(title.toLowerCase())) {
    alert("found terms and conditions");
  }
}
