import { Category } from '@src/types/Category';
import classifyPolicy from '@src/utils/classifyPolicy';
import { createResource, Match, Resource, Switch } from 'solid-js';
import CategoryAndHeadings from './CategoryAndHeadings';


export default function SeverityAnalysisResult(props: { policy: Resource<string> }) {
  const [severities] = createResource(props.policy, classifyPolicy);

  return (
    <Switch>
      <Match when={severities.state == "errored"}>
        <p>Error: {severities.error}</p>
      </Match>
      <Match when={severities.state == "pending"}>
        <p>Loading...</p>
      </Match>
      <Match when={severities.state == "ready"}>
        <div>{
          <div class="result-container">
            <h2>Severity Analysis</h2>
            {Object.entries(severities())
              .filter(([_, headings]) => headings.length > 0)
              .map(([category, headings]) => (
                <CategoryAndHeadings category={category as Category} headings={headings} />
              ))}
          </div>
        }</div>
      </Match>
    </Switch>
  )
}