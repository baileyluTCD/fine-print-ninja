import SeverityAnalysisResult from "@src/components/popup/ServerityAnalysisResult";
import SummaryResult from "@src/components/popup/SummaryResult";
import ToxicityAnalysisResult from "@src/components/popup/ToxicityAnalysisResult";
import "@src/styles/index.css";
import "@src/styles/popup.css";
import readTAndCData from "@src/utils/readTAndCData";
import { createResource, createSignal, Show } from "solid-js";

const [terms] = createResource(window.location.hostname, readTAndCData);

export function Popup() {
  const [inputTerms, setInputTerms] = createSignal("");

  const termsToAnalyse = () =>
    inputTerms().length > 0 ? inputTerms() : terms();

  // signal for comparison url
  const [comparisonURL, setComparisonURL] = createSignal("");
  const [comparisonTerms] = createResource(comparisonURL, readTAndCData);
  const [openComparisonData, setOpenComparisonData] = createSignal(false);

  // signal to manage collapsed state of popup
  const [isCollapsed, setIsCollapsed] = createSignal(false);

  const toggleCollapsed = () => setIsCollapsed(!isCollapsed());

  return (
    <main class="fixed top-10 right-10 z-[1000] bg-transparent h-screen w-1/3">
      <div
        class={`bg-white border border-black rounded-lg p-10 transition-all ease-in-out overflow-y-scroll h-2/3 shadow ${
          isCollapsed() && "collapsed-popup"
        }`}
      >
        <button onClick={toggleCollapsed} class="collapse-button">
          {isCollapsed() ? "Expand" : "Collapse"}
        </button>

        <div class="h-2 w-full my-2"/>

        <Show when={!isCollapsed()}>
          <textarea
            value={inputTerms()}
            on:input={(e) => {
              setInputTerms(e.target.value);
            }}
            placeholder="Paste Terms and Conditions here..."
            rows={10}
            class="terms-input"
          />

          <SeverityAnalysisResult policy={termsToAnalyse} />
          <ToxicityAnalysisResult policy={termsToAnalyse} />
          <SummaryResult policy={termsToAnalyse} />

          {/* Service Comparison URL Input */}
          <div class="comparison-section">
            <input
              type="text"
              value={comparisonURL()}
              onInput={(e) => setComparisonURL(e.target.value)}
              placeholder="Enter URL to compare Terms & Conditions of..."
              class="comparison-input"
            />
            <button
              onClick={() => {
                setOpenComparisonData(!openComparisonData());
              }}
              class="compare-button"
            >
              Compare
            </button>
            {openComparisonData() && (
              <>
                <p>Comparison Result</p>
                <SeverityAnalysisResult policy={comparisonTerms} />
                <ToxicityAnalysisResult policy={comparisonTerms} />
                <SummaryResult policy={comparisonTerms} />
              </>
            )}
          </div>
        </Show>
      </div>
    </main>
  );
}
