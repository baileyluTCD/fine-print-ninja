import SeverityAnalysisResult from '@src/components/popup/ServerityAnalysisResult';
import "@src/styles/index.css";
import "@src/styles/popup.css";
import readTAndCData from '@src/utils/readTAndCData';
import { createResource, createSignal, Show } from 'solid-js';

const [terms] = createResource(window.location.hostname, readTAndCData);

export function Popup() {
  // signal for comparison url
  const [comparisonURL, setComparisonURL] = createSignal('');

  // signal to manage collapsed state of popup 
  const [isCollapsed, setIsCollapsed] = createSignal(false);

  const toggleCollapsed = () => setIsCollapsed(!isCollapsed());

  // func to hanlde comparison
  const handleCompare = () => {
    if (comparisonURL().trim() === '') {
      alert('Please enter a URL of another service for Ts&Cs comparison.');
      return;
    }
    console.log('Comparison initiated with URL:', comparisonURL());

    // CODE TO DETCH SECOND SET OF TSANDCS HERE 
    // API FETCH REQ WRAPPER FUNCTION HERE ...
  };

  const handleAnalyse = () => {
    if (terms().trim() === '') {
      alert('Paste some T&Cs to analyze.');
      console.log('No terms provided');
      return;
    }

    // PLACEHOLDER/ MOCK RESULTS with delay to sim analysis step
    setTimeout(() => {
      // Mock analysis result
      const mockResults = [
        'Data sharing with 3rd parties - High Severity',
        'Automatic subscription renewal - Medium Severity',
        'Limited Liability clause - Low Severity'
      ];

    }, 2000); // 2 sec delay sim
  };

  return (
    <main class="fixed top-10 right-10 z-50 bg-transparent">
      <div class={`bg-white border border-black rounded-lg p-10 transition-all ease-in-out ${isCollapsed() && 'collapsed-popup'}`}>

        {/* Collapse Button */}
        <button onClick={toggleCollapsed} class="collapse-button">
          {isCollapsed() ? "Expand" : "Collapse"}
        </button>

        <Show when={!isCollapsed()}>
          <p>Found T&C's</p>

          {/* Input area for manual Ts&Cs*/}
          {/*onInput={(e) => setTerms(e.target.value)}*/}
          <textarea
            value={terms() ? terms() : ""}
            placeholder="Paste Terms and Conditions here..."
            rows={10}
            class="terms-input"
          />

          {/* Analyse Button */}
          <button onClick={handleAnalyse} class="analyse-button" disabled={terms.loading}>
            {terms.loading ? "Analysing..." : "Analyse"}
          </button>

          <SeverityAnalysisResult policy={terms} />

          {/* Service Comparison URL Input */}
          <div class="comparison-section">
            <input
              type="text"
              value={comparisonURL()}
              onInput={(e) => setComparisonURL(e.target.value)}
              placeholder="Enter URL to compare Terms & Conditions of..."
              class="comparison-input"
            />
            <button onClick={handleCompare} class="compare-button">
              Compare
            </button>
          </div>

        </Show>
      </div>
    </main>
  );
}