import runToxicityAnalysis from "@src/utils/runToxicityAnalysis";
import { Accessor, createResource, Match, Switch } from "solid-js";

export default function ToxicityAnalysisResult(props: {
  policy: Accessor<string>;
}) {
  if (props.policy == null) {
    <p>Please input a value to view toxicity analysis</p>;
  }

  const [predictions] = createResource(props.policy, runToxicityAnalysis);

  return (
    <Switch>
      <Match when={predictions.state == "errored"}>
        <p>Error calculating toxicity analysis descriptors.</p>
      </Match>
      <Match when={predictions.state == "pending"}>
        <p>Loading...</p>
      </Match>
      <Match
        when={
          predictions.state == "ready" &&
          predictions().filter((prediction) => prediction.results[0].match)
            .length > 0
        }
      >
        <div>
          {
            <>
              <h2>Toxicity Analysis Descriptors</h2>
              <div class="result-container">
                {predictions()
                  .filter((prediction) => prediction.results[0].match)
                  .map((prediction) => (
                    <h2>{prediction.label}</h2>
                  ))}
              </div>
            </>
          }
        </div>
      </Match>
    </Switch>
  );
}
