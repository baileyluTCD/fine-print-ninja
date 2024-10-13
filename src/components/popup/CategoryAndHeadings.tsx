import { Category } from "@src/types/Category";
import { createSignal, Show } from "solid-js";

export default function CategoryAndHeadings(props: {
  category: Category;
  headings: string[];
}) {
  const [expandHeadings, setExpandHeadings] = createSignal(false);
  const toggleExpandHeadings = () => {
    setExpandHeadings(!expandHeadings());
  };

  return (
    <div class="flex flex-col w-full bg-gray-200 shadow m-2 p-2">
      <div class="result-item">
        <h2 class="font-semibold">{props.category}</h2>
        <button onClick={toggleExpandHeadings} class="expand-button">
          {expandHeadings() ? "Collapse" : "Expand"}
        </button>
      </div>
      <Show when={expandHeadings()}>
        {props.headings.map((heading) => (
          <p class="details capitalize"> ○ {heading}</p>
        ))}
      </Show>
    </div>
  );
}
