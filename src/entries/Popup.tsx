import "@src/styles/index.css";
import { createSignal, Show } from 'solid-js';

export function Popup() {
  // create signal to manage ts&cs
  const [terms, setTerms] = createSignal('');
  
  // signal for analysis results
  const [analysisResult, setAnalysisResults] = createSignal<string[]>([]);

  // signal for 'loading' state
  const [loading, setLoading]= createSignal(false);

  // signal for expanded state of terms items
  const [expandedItems, setExpandedItems] = createSignal<{ [key: string]: boolean}>({});

  // signal for comparison url
  const [comparisonURL, setComparisonURL] = createSignal('');

  // signal to manage collapsed state of popup 
  const [isCollapsed, setIsCollapsed] = createSignal(false);

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed());
  };

  // func to hanlde comparison
  const handleCompare = () => {
    if (comparisonURL().trim() === ''){
      alert('Please enter a URL of another service for Ts&Cs comparison.');
      return;
    }
    console.log('Comparison initiated with URL:', comparisonURL());

    // CODE TO DETCH SECOND SET OF TSANDCS HERE 
    // API FETCH REQ WRAPPER FUNCTION HERE ...
  };

  const toggleExpanded = (result: string) => {
    setExpandedItems({
      ...expandedItems(),
      [result]: !expandedItems()[result]
    });
  }

  const handleAnalyse = () => {
    console.log('Handle analysis triggered');
    if (terms().trim() === '') {
      alert('Paste some T&Cs to analyze.');
      console.log('No terms provided');
      return;
    }

    // set 'loading' as true upon analysis start
    setLoading(true);
    console.log('Analysing terms:', terms());

    // PLACEHOLDER/ MOCK RESULTS with delay to sim analysis step
    setTimeout(() => {
      // Mock analysis result
      const mockResults = [
        'Data sharing with 3rd parties - High Severity',
        'Automatic subscription renewal - Medium Severity',
        'Limited Liability clause - Low Severity'
      ];

      setAnalysisResults(mockResults);
      setLoading(false); // set loading to false when analysis is complete
    }, 2000); // 2 sec delay sim
  };

  return (
    <main class="fixed top-10 right-10 z-50 bg-transparent">
      <div class={`bg-white border border-black rounded-lg p-10 transition-all ease-in-out ${isCollapsed() ? 'collapsed-popup' : ''}`}>

        {/* Collapse Button */}
        <button onClick={toggleCollapsed} class="collapse-button">
          {isCollapsed() ? "Expand" : "Collapse"}
        </button>

        <Show when={!isCollapsed()}>
        <p>Found T&C's</p>

        {/* Input area for manual Ts&Cs*/}
        <textarea
          value={terms()}
          onInput={(e) => setTerms(e.target.value)}
          placeholder="Paste Terms and Conditions here..."
          rows={10}
          class="terms-input"
        />

        {/* Analyse Button */}
        <button onClick={handleAnalyse} class="analyse-button" disabled={loading()}>
          {loading() ? "Analysing..." : "Analyse"}
        </button>

        {/* Loading Indicator */}
        <Show when={loading()}>
          <div class="loading-indicator">
            <p>Processing the Terms and Conditions... Hang On!.</p>
          </div>
        </Show>

        {/* Severity Analysis Results */}
        {analysisResult().length > 0 && (
          <div class="result-container">
            <h2>Severity Analysis</h2>
            {analysisResult().map((result) => (
              <div class="result-item">
                <p class={`severity-${result.split('-')[1].trim().toLowerCase()}`}>
                {result}
                </p>
                <button onClick={() => toggleExpanded(result)} class="expand-button">
                  {expandedItems()[result] ? "Collapse" : "Expand"}
                </button>
                <Show when={expandedItems()[result]}>
                  <p class="details">
                    {/* Placeholder for additional information */}
                    Detailed information about: {result}
                  </p>
                </Show>
              </div>
            ))}
          </div>
        )}

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
              
    <style>
    {`
        .terms-input {
          width: 100%;
          margin-top: 10px;
          padding: 8px;
          font-size: 14px;
          resize: vertical;
        }
        .analyse-button {
          display: block;
          margin-top: 16px;
          padding: 10px;
          width: 100%;
          background-color: #4CAF50;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 16px;
        }
        .analyse-button:disabled {
          background-color: #9e9e9e;
          cursor: not-allowed;
        }
        .loading-indicator {
          margin-top: 20px;
          background-color: #f9f9f9;
          padding: 10px;
          border-radius: 5px;
          font-style: italic;
          color: #555;
        }
        .result-container {
          margin-top: 20px;
        }
        .result-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .expand-button {
          margin-left: 10px;
          padding: 5px 10px;
          background-color: #007BFF;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 14px;
        }
        .expand-button:hover {
          background-color: #0056b3;
        }
        .collapse-button {
          display: block;
          background-color: #007BFF;
          color: white;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .collapsed-popup {
          padding: 10px;
          max-height: 50px;
          overflow: hidden;
        }
        .severity-high {
          color: red;
        }
        .severity-medium {
          color: orange;
        }
        .severity-low {
          color: green;
        }
        .details {
          font-size: 14px;
          color: #666;
          margin-left: 20px;
          margin-top: 5px;
        }
        `}
    </style>
    </main>
  );
}