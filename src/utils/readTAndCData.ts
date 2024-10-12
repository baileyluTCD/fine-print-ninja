export default async function readTAndCData(): Promise<[String?, Error?]> {
  const hostname = window.location.hostname.slice("www.".length);

  const response = await fetch(
    `https://raw.githubusercontent.com/supdey/tos-dataset/refs/heads/dataset/${hostname}.txt`
  );

  if (!response.ok || response.status == 404)
    return [
      null,
      new Error("No privacy policy exists on record for this website"),
    ];

  return [await response.text(), null];
}
