import "@src/styles/index.css";
import { createSignal } from "solid-js";

export function NewTab() {
  const [count, setCount] = createSignal(0);

  return (
    <main>
      count: {count()}
      <button on:click={() => setCount(count() + 1)}>Increment</button>
    </main>
  );
}