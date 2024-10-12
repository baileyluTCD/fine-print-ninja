import "@src/styles/index.css";

export function Popup() {
  return (
    <main class="fixed top-10 right-10 z-50 bg-transparent">
      <div class="bg-white border border-black rounded-lg p-10 transition-all ease-in-out">
        <p>Found terms and conditions</p>
      </div>
    </main>
  );
}