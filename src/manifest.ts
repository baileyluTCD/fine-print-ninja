import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "../package.json";

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch, label = "0"] = packageJson.version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

const manifest = defineManifest(async () => ({
  manifest_version: 3,
  name: packageJson.displayName ?? packageJson.name,
  version: `${major}.${minor}.${patch}.${label}`,
  description: packageJson.description,
  options_page: "templates/options.html",
  background: { service_worker: "src/entries/Background.tsx" },
  action: {
    default_popup: "templates/popup.html",
    default_icon: "finePrintNinja.png",
  },
  chrome_url_overrides: {
    newtab: "templates/newtab.html",
  },
  icons: {
    "128": "finePrintNinja.png",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/popupOnTCs.ts"],
    },
  ],
  devtools_page: "templates/devtools.html",
  web_accessible_resources: [
    {
      resources: ["assets/js/*.js", "assets/css/*.css", "assets/img/*"],
      matches: ["*://*/*"],
    },
  ],
}));

export default manifest;
