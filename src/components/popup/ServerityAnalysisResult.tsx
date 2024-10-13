import { Category } from "@src/types/Category";
import classifyPolicy from "@src/utils/classifyPolicy";
import { Accessor, createResource, Match, Switch } from "solid-js";
import CategoryAndHeadings from "./CategoryAndHeadings";

export default function SeverityAnalysisResult(props: {
  policy: Accessor<string>;
}) {
  if (props.policy == null) {
    <p>Please input a value to view severity analysis</p>;
  }

  const [severities] = createResource(props.policy, classifyPolicy);

  return (
    <Switch>
      <Match when={severities.state == "errored"}>
        <p>Error: {severities.error}</p>
      </Match>
      <Match when={severities.state == "pending"}>
        <p>Loading...</p>
      </Match>
      <Match
        when={
          severities.state == "ready" && Object.values(severities()).length > 0
        }
      >
        <>
          <h2>Severity Analysis</h2>
          <div class="result-container">
            {Object.entries(severities())
              .filter(([_, headings]) => headings.length > 0)
              .map(([category, headings]) => (
                <CategoryAndHeadings
                  category={category as Category}
                  headings={headings}
                />
              ))}
          </div>
        </>
      </Match>
    </Switch>
  );
}
