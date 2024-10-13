import * as toxicity from "@tensorflow-models/toxicity";

const threshold = 0.9; // Set the minimum prediction confidence

export default async function runToxicityAnalysis(policy: string): Promise<Prediction[]> {
  const model = await toxicity.load(threshold, []);

  const predictions = await model.classify([policy]);

  return predictions;
}
