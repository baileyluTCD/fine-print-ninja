export default async function readTAndCData(hostname: string): Promise<string> {
  const strippedHostname = hostname.slice("www.".length);

  const response = await fetch(
    `https://raw.githubusercontent.com/supdey/tos-dataset/refs/heads/dataset/${strippedHostname}.txt`
  );

  if (!response.ok || response.status == 404)
    throw new Error("No privacy policy exists on record for this website");

  return await response.text();
}
