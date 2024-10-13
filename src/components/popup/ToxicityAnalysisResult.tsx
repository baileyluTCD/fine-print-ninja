import runToxicityAnalysis from "@src/utils/runToxicityAnalysis";
import { Accessor, createResource, Match, Switch } from "solid-js";

export default function ToxicityAnalysisResult(props: { policy: Accessor<string> }) {
  if (props.policy == null) {
    <p>Please input a value to view toxicity analysis</p>;
  }

  const [predictions] = createResource(props.policy, runToxicityAnalysis);

  return (
    <Switch>
      <Match when={predictions.state == "errored"}>
        <p>Error: {predictions.error}</p>
      </Match>
      <Match when={predictions.state == "pending"}>
        <p>Loading...</p>
      </Match>
      <Match when={predictions.state == "ready"}>
        <div>
          {
            <div class="result-container">
              <h2>Toxicity Analysis</h2>
              {predictions().map((prediction) => (
                <span>
                  <h2>{prediction.label}</h2>
                  {prediction.results.map((result) => (
                    <span>
                      <p>Match: {result.match}</p>
                      <p>{result.probabilities.toString()}</p>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          }
        </div>
      </Match>
    </Switch>
  );
}
