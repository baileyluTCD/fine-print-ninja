import summarizePolicy from "@src/utils/summarizePolicy";
import { Accessor, createResource, Match, Switch } from "solid-js";

export default function ToxicityAnalysisResult(props: {
  policy: Accessor<string>;
}) {
  if (props.policy == null) {
    <p>Please input a value to view text summary</p>;
  }

  const [summary] = createResource(props.policy, summarizePolicy);

  return (
    <Switch>
      <Match when={summary.state == "errored"}>
        <p>Error summarising text</p>
      </Match>
      <Match when={summary.state == "pending"}>
        <p>Loading...</p>
      </Match>
      <Match when={summary.state == "ready" && summary().length > 0}>
        <>
          <h2>Most Important Text Summary</h2>
          <div class="result-container">
            {summary().map((sentence) => (
              <p>{sentence}</p>
            ))}
          </div>
        </>
      </Match>
    </Switch>
  );
}
