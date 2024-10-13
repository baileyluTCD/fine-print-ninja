import summarizePolicy from "@src/utils/summarizePolicy";
import {
    Accessor,
    createResource,
    createSignal,
    Match,
    Show,
    Switch,
} from "solid-js";

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
          <h2 class="mb-1">Most Important Text Summary</h2>
          {summary().map((sentence) => (
            <ExpandableParagraph text={sentence} />
          ))}
        </>
      </Match>
    </Switch>
  );
}

export function ExpandableParagraph(props: { text: string }) {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <button
      on:click={() => setIsOpen(!isOpen())}
      class="text-left hover:underline"
    >
      <Show when={!isOpen()} fallback={<p>{props.text}</p>}>
        <p>{toShortenedString(props.text)}</p>
      </Show>
    </button>
  );
}

function toShortenedString(input: string) {
  return input.length > 200 ? input.slice(0, 200).trim() + "..." : input;
}
