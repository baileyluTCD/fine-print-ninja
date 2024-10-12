// Import TensorFlow.js and the toxicity model (these are loaded from CDN in the HTML)
const threshold = 0.9; // Set the minimum prediction confidence

// List of sensitive terms you want to flag in the T&C
const categories = {
  "Tracking": [
    "tracking",
    "cookies",
    "IP address",
    "browser fingerprinting",
    "data mining",
    "data extraction",
    "filtering circumvention",
    "internet usage",
    "tracking pixels",
    "identifier synchronization",
    "deep-link",
    "page-scrape",
    "robot",
    "spider",
  ],
  "Data Collection": [
    "personal data",
    "data collection",
    "profiling",
    "behavioral data",
    "registration data",
    "customer data",
    "inactive account deletion",
    "accurate data maintenance",
    "publisher data",
    "unique IDs",
    "WHOIS data",
    "monitor",
    "look-up",
  ],
  "Third-Party Sharing": [
    "third party",
    "third-party partners",
    "advertising partners",
    "data sharing",
    "legal disclosure",
    "third-party content",
    "third-party promotions",
    "third-party products/services",
    "oracle partners",
    "subprocessors",
    "ICANN",
    "registry administrators",
    "disclose any information",
    "preserve",
  ],
  "Surveillance": [
    "surveillance",
    "monitoring",
    "video recording",
    "location tracking",
    "security precautions",
    "service investigation",
    "illegal use monitoring",
    "conduct rules enforcement",
    "behavioral tracking",
    "user activity tracking",
    "monitor",
  ],
  "User Consent and Rights": [
    "waive notice",
    "acceptance by use",
    "cease service",
    "indemnity",
    "discretionary enforcement",
    "publisher consent",
    "end user consent",
    "data access requests",
    "opt-out rights",
    "UDRP agreement",
    "dispute resolution",
    "review agreement periodically",
    "BY USING THE SITE, YOU AGREE TO THESE TERMS OF USE",
    "demands, loss, liability, claims or expenses",
    "terminate your access",
    "WITHOUT PRIOR NOTCE TO YOU",
  ],
  "Data Retention": [
    "data deletion",
    "180 days inactivity",
    "no data restoration",
    "data storage",
    "global data transfer",
    "domain registration term",
    "renewal",
    "account deletions",
    "transmittal or communication",
    "confidentiality",
  ],
  "Security Measures": [
    "reasonable security",
    "unauthorized access",
    "server security",
    "internet risks",
    "cyber attack prevention",
    "security incident handling",
    "account login protection",
    "password confidentiality",
  ],
  "Cookies and Similar Technologies": [
    "cookies",
    "pixels",
    "third-party cookies",
  ],
  "Data Transfers and Storage Location": [
    "global data transfers",
    "data storage location",
    "EU standard contractual clauses",
    "data export",
    "cross-device identifiers",
    "linked-Sites",
  ],
  "User Profiling and Automated Decision Making": [
    "behavioral profiling",
    "automated decision making",
    "targeted advertising",
    "user interest profiling",
  ],
  "Data Breach Notification": [
    "data breach",
    "security incident",
    "fraud detection",
    "ad fraud prevention",
    "malicious activity prevention",
    "DISCLAIMS ANY AND ALL LIABILITY FOR THE ACTS, OMISSIONS AND CONDUCT OF ANY THIRD PARTIES",
  ],
};

const severities = {
  "Tracking": 4,
  "Data Collection": 4,
  "Third-Party Sharing": 4,
  "Surveillance": 5,
  "User Consent and Rights": 3,
  "Data Retention": 3,
  "Security Measures": 5,
  "Cookies and Similar Technologies": 3,
  "Data Transfers and Storage Location": 3,
  "User Profiling and Automated Decision Making": 4,
  "Data Breach Notification": 5,
};

// Load the toxicity model
toxicity.load(threshold).then((model) => {
  const form = document.getElementById("inputForm");
  const sentenceInput = document.getElementById("sentenceInput");
  const results = document.getElementById("Results");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const sentence = sentenceInput.value;

    const terms = {};

    for (const [category, headings] of Object.entries(categories)) {
      console.log(headings);

      const headingsInSentence = headings.filter((heading) =>
        sentence.includes(heading)
      );

      terms[category] = headingsInSentence;
    }

    if (Object.keys(terms).length > 0) {
      results.innerHTML += `<strong>Suspicious terms found:</strong>`;
      results.innerHTML += `<strong>Tracking:</strong> ${terms["Tracking"]}`;
      results.innerHTML += `<strong>Data Collection::</strong> ${terms["Data Collection"]}`;
      results.innerHTML += `<strong>Third-Party Sharing:</strong> ${terms["Third-Party Sharing"]}`;
      results.innerHTML += `<strong> User Consent and Rights:</strong> ${terms[ "User Consent and Rights"]}`;
      results.innerHTML += `<strong>Data Retention:</strong> ${terms["Data Retention"]}`;
      results.innerHTML += `<strong>Security Measures:</strong> ${terms["Security Measures"]}`;
      results.innerHTML += `<strong>Cookies and Similar Technologies:</strong> ${terms["Cookies and Similar Technologies"]}`;
      results.innerHTML += `<strong>Data Transfers and Storage Location:</strong> ${terms["Data Transfers and Storage Location"]}`;
      results.innerHTML += `<strong>User Profiling and Automated Decision Making:</strong> ${terms["User Profiling and Automated Decision Making"]}`;
      results.innerHTML += `<strong>Data Breach Notification:</strong> ${terms["Data Breach Notification"]}`;
    } else {
      results.innerHTML = "No suspicious terms found.";
    }

    model
      .classify([sentence])
      .then((predictions) => {
        predictions.forEach((prediction) => {
          const label = prediction.label;
          const match = prediction.results[0].match;
          const probability = prediction.results[0].probabilities[1];
        });
      })
      .catch((err) => {
        console.error("Error classifying the sentence:", err);
      });         
  });
});
