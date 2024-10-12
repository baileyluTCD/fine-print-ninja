import { Category } from "@src/types/Category";
import toxicity from "@tensorflow-models/toxicity";
import _categories from "../assets/data/categories.json";

const categories = _categories as unknown as Record<Category, string[]>;

// Import TensorFlow.js and the toxicity model (these are loaded from CDN in the HTML)
const threshold = 0.9; // Set the minimum prediction confidence

export default async function classifyPolicy(
  policy: string
): Promise<Record<Category, string[]>> {
  const terms: Record<Category, string[]> = {
    [Category.Tracking]: [],
    [Category.DataCollection]: [],
    [Category.ThirdPartySharing]: [],
    [Category.Surveillance]: [],
    [Category.UserContentAndRights]: [],
    [Category.DataRetention]: [],
    [Category.SecurityMeasures]: [],
    [Category.Cookies]: [],
    [Category.DataTransfers]: [],
    [Category.UserProfiling]: [],
    [Category.DataBreachNotification]: []
  };

  for (const [category, headings] of Object.entries(categories)) {
    const headingsInSentence = headings.filter((heading) =>
      policy.includes(heading)
    );

    terms[category] = headingsInSentence;
  }

  return terms;
}

export async function runToxicityAnalysis(policy: string) {
  const model = await toxicity.load(threshold, []);

  model
    .classify([policy])
    .then((predictions) => {
      predictions.forEach((prediction) => {
        const label = prediction.label;
        const match = prediction.results[0].match;
        const probability = prediction.results[0].probabilities[1];
      });
    })
    .catch((err) => {
      console.error("Error classifying the sentence:", err);
    });
}
